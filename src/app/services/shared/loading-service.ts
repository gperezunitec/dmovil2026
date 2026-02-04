import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {LoadingController} from "@ionic/angular/standalone";

@Injectable({
  providedIn: 'root',
})
export class LoadingService {

  private readonly _loadingController=inject(LoadingController);
  _loading:WritableSignal<HTMLIonLoadingElement|null>=signal(null)

  async createLoading(message:string='Cargando...'):Promise<void>{
    const loading= await this._loadingController.create({message,mode:'ios'});
    this._loading.set(loading);
    await this._loading()?.present();
  }

  async closeLoading():Promise<void> {
    await this._loading()?.dismiss();
    this._loading.set(null);
  }

}


