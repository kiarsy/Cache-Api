export function makeDummyString() {
    let strings = "QWERTYUIO3PLKJHG2FD0SA1ZXCVB9NMpoiuyt4rewqa8sdfghj6klmn7bvcxz"
    let length = 20;
    var output = "";
    for (var i = 0; i < length; i++) {
        var rnd = Math.random() * strings.length;
        output = output +  strings.charAt(rnd)
    }
    return output;
}