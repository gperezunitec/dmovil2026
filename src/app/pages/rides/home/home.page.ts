import {Component, inject, signal, WritableSignal} from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonToast} from '@ionic/angular/standalone';
import {ToastService} from "../../../services/shared/toast-service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonToast],
})
export class HomePage {
  constructor() {}

  private readonly _toastService: ToastService=inject(ToastService);
  showToast:WritableSignal<boolean>=signal(false);

  openToast():void{
    this.showToast.set(true);
  }

  dimissToast():void{
    this.showToast.set(false);
  }

  openOrCloseToast():void{
    this.showToast.update((currentValue)=>!currentValue);
  }

  async openToastService():Promise<void>{
    await this._toastService.showToast('Bienvenido a ionic');
    await this._toastService.showToast('A ocurrido un error', true);
  }

}
