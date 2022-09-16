class HashTable {
    constructor(size=53){
        this.keyMap = new Array(size);
    }

    _hash(key) {
        let total = 0;
        let WEIRD_PRIME = 31;
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            let char = key[i];
            let value = char.charCodeAt(0) - 96;
            total = (total * WEIRD_PRIME + value) % this.keyMap.length;
        }
        return total;
    }
    set(key, value){//Accepts key and value//
        let index = this._hash(key);//Passes in key to index/
        if(!this.keyMap[index]){
            this.keyMap[index] = [];//If there is no key-value pair in index empty array//
        }
        this.keyMap[index].push([key, value]);//Adds to array with key-value 'parent' of the index//
    }
    get(key){//Accepts a key//
        let index = this._hash(key);//Passes key to index//
        if(this.keyMap[index]){//Checks if something us at index//
            for(let i = 0;i < this.keyMap[index].length; i++){//Loop over array finding correct spot//
                if(this.keyMap[index][i][0] === key) {//Checks if key passed equals key that we are looking for//
                    return this.keyMap[index][i][1];//Returns only the value at index of 1//
                }
            }
        }
        return undefined;//If key value pairs are not found//
    }
}

let ht = new HashTable(15);
ht.set("Halo","FPS")
ht.set("Lord of the Rings","RPG")
ht.set("APEX","ROYALE FPS")
ht.set("Call of Duty","FPS")
ht.set("GTAV","RPG/Simulator")
ht.set("007 Goldeneye","FPS")
ht.set("DOOM","FPS")