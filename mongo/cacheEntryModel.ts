import { Document, Schema, Model, model } from 'mongoose';
import { OperationFailedException } from '../errors/customErrors';
import { makeDummyString } from '../utilities';
import { v4 as uuidv4 } from 'uuid';

export interface ICacheEntryDocument extends Document {
  key: string;
  value: string;
  time: number;
  getValue(): string;
}

export const CacheEntrySchema: Schema = new Schema({
  key: { type: String, unique: true, required: true, dropDups: true },
  value: { type: String, required: true },
  time: { type: Number, required: true }
});


export interface ICacheEntryModel extends Model<ICacheEntryDocument> {
  insertOne(key: string, value: string, loopCounter: number): Promise<void>;
  initializing(limit: number): Promise<void>;
}


CacheEntrySchema.static('insertOne', async (key: string, value: string, loopCounter: number = 0): Promise<void> => {
  //Select the oldest entry existed to replace with new entry.
  let oldestEntry = await CacheEntry.findOne().sort([['time', 'asc']]);
  
  // REPLACE the oldestEntry with new values with filter on key and time, so if during this operation another request 
  // changed the "oldestEntry" it will not work
  var newEntry = await CacheEntry.findOneAndReplace({ key: oldestEntry!["key"], time: oldestEntry!["time"] }, { key: key, value: value, time: new Date().getTime() });

  // if newEntry is null, it means another request replaced oldestEntry first. so wee have to find latestEntry again

  if (!newEntry) {
    //Loop counter will prevent this function from stucking in loop in the tough situations
    loopCounter++;
    if (loopCounter > 5)
      throw new OperationFailedException();

    CacheEntry.insertOne(key, value, loopCounter);
  }
});


// This method runs on project runs,
// it will make sure that atleast a specific numbers of documents (limit) exist in the mongo
// This method ("initializing") and "insertOne" work together to make sure that
// the number of cache entries are klimited to limit number
CacheEntrySchema.static('initializing', async (limit: number): Promise<void> => {
  let currentDocuments = await CacheEntry.count();

  if (currentDocuments < limit) {
    var neededDocuments = limit - currentDocuments;

    var documents = [];
    while (neededDocuments > 0) {

      documents.push({ key: uuidv4(), time: 0, value: "empty" });
      neededDocuments--;
    }

    await CacheEntry.insertMany(documents);
  }

});

let ttl_duration = 1 * 1000;
CacheEntrySchema.method('getValue', function (): string {
  if (this.time + ttl_duration < new Date().getTime()) {
    var value = makeDummyString();
    this.value = value;
  }
  this.time = new Date().getTime();
  this.save();

  return this.value;
});


export const CacheEntry = model<Model<ICacheEntryDocument>,ICacheEntryModel>('CacheEntry', CacheEntrySchema);
export default CacheEntry;