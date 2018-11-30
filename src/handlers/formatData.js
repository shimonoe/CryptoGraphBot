
const assetsObjectToText = async (assets) => {
    var result = await assets;
    var text = "";
    const keys = Object.keys(result);
    for (var i in keys) {
        text += `${keys[i]}: ${result[keys[i]]}`;
        if(i != keys.length - 1)
            text += '\n';
    }
    return text;
}

module.exports = {assetsObjectToText};
