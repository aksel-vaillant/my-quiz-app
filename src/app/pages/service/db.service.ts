import { Storage } from '@capacitor/storage';
import { Injectable } from "@angular/core";
import fakeData from './fakeData.json';

export enum DBKey{
    Duration, Difficulty, Type, Users, Score
}

@Injectable({
  providedIn: 'root'
})
export class DBService{

    constructor(){
        this.init()
    }

    // If my datas aren't initialized then, I give them a value
    async init(){
        let duration = await this.getValue(DBKey.Duration); 
        if(duration == null || duration == undefined){           
            this.setValue(DBKey.Duration, "10");
        }

        let difficulty = await this.getValue(DBKey.Difficulty);        
        if(difficulty == null || difficulty == undefined){
            this.setValue(DBKey.Difficulty, "any");
        }

        let type = await this.getValue(DBKey.Type); 
        if(type == null || type == undefined){
            this.setValue(DBKey.Type, "any");
        }

        let score = await this.getValue(DBKey.Score); 
        if(score == null || score == undefined){
            this.setValue(DBKey.Score, "0");
        }

        let users = await this.getObject(DBKey.Users);
        if(users == null || users == undefined){    
            let datas = JSON.parse(JSON.stringify(fakeData))
            this.setObject(DBKey.Users, datas)
        }
    }

    // Setting a string
    async setValue(key : DBKey, val : string) {
        await Storage.set({
          key: key.toString(),
          value: val
        });
    }

    // Getting a value
    async getValue(key: DBKey) {
        const ret = await Storage.get({ key: key.toString() })
        return ret.value
    }

    // Setting an object
    async setObject(key : DBKey, val : any) {
        await Storage.set({
          key: key.toString(),
          value: JSON.stringify(val)
        });
    }

    // Getting an object
    async getObject(key: DBKey) {
        const ret = await Storage.get({ key: key.toString() })
        return JSON.parse(ret.value)
    }

    // Remove data 
    async remove(key: DBKey) {
        await Storage.remove({ key: key.toString() })
    }
}