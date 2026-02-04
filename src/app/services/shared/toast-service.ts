import {inject, Injectable} from '@angular/core';
import {ToastController} from "@ionic/angular/standalone";

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly _toastController: ToastController=inject(ToastController);

  async showToast(message:string, isError:boolean=false):Promise<void>{
const toast = await this._toastController.create({
  message: message,
  duration: 3000,
  color:isError?'danger':'success',
  position:'bottom',
  mode:'ios',
});
await toast.present();
  }
}
