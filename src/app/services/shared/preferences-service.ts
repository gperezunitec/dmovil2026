import {inject, Injectable} from '@angular/core';
import {Preferences} from "@capacitor/preferences";
import {EncryptionService} from "./encryption-service";

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {

  private readonly _encryptionService:EncryptionService=inject(EncryptionService);

  async clear(){
    await Preferences.clear();
  }

  async get<T>(key:string): Promise<T|null> {
    const encryptedKey:string=this._encryptionService.encryptData(key)
    const {value}=await Preferences.get({key:encryptedKey});
    if(value){
      const decryptedValue: string=this._encryptionService.decryptData(value);
      return JSON.parse(decryptedValue);
    }
    return null;
  }


  async remove(key:string){
    const encryptedKey:string=this._encryptionService.encryptData(key)
    await Preferences.remove({key});
  }

  async set<T>(key:string, value:T){
    const encodedValue:string=JSON.stringify(value);
    const encryptedKey:string=this._encryptionService.encryptData(key);
    const encryptedValue:string=this._encryptionService.encryptData(encodedValue);
    await Preferences.set({key:encryptedKey, value: encryptedValue});

  }


}
