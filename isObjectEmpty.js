const isObjectEmpty = (object) => {
    for (let key in object){
        if (Object.hasOwn(object, key)){
            return false;
        }
    }

    return true;
} 

module.exports = isObjectEmpty;
