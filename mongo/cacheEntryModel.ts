import { Document, Schema, Model, model } from 'mongoose';

export interface ICacheEntryDocument extends Document {
  key: string;
  value: string;
  time: number;
}

export const CacheEntrySchema: Schema = new Schema({
  key: { type: String, unique: true, required: true, dropDups: true },
  value: { type: String, required: true },
  time: { type: Number, required: true }
});

export const CacheEntry = model<Model<ICacheEntryDocument>>('CacheEntry', CacheEntrySchema);
export default CacheEntry;