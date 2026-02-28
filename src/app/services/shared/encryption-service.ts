import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  decryptData(encryptedData:string):string{
    return window.atob(encryptedData);
  }


  encryptData(data:string):string{
    return window.atob(data);
  }

}
