import {inject, Injectable} from '@angular/core';
import {AlertController} from "@ionic/angular/standalone";
import {AlertButton} from "@ionic/angular";
import {AlertDto} from "../../dtos/shared/alert-dto";

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private readonly _alertController=inject(AlertController);

  async showAlert(
    input:AlertDto):Promise<void> {

    if(!input){
      throw new Error('Input cannot be empty');
    }

    if (input.buttons.length===0){
      input.buttons=[{text:'OK',role:'confirm'}];
    }


    const alert: HTMLIonAlertElement=await this._alertController.create({
      mode:"ios",
      header:input.header,
      subHeader:input.subHeader,
      message:input.message,
      buttons:input.buttons,
    })
    await alert.present();
  }
}
