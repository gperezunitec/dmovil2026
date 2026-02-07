import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormGroup, FormsModule} from '@angular/forms';
import {IonAlert, IonButton, IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {AlertService} from "../../../services/shared/alert-service";
import {ToastService} from "../../../services/shared/toast-service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonAlert]
})
export class ProfilePage implements OnInit {

  private readonly _alertService=inject(AlertService);
  private readonly _toastService=inject(ToastService);
  showAlert:WritableSignal<boolean>=signal(false)

  constructor() {
    this.acceptCancelRideAlert()

  }

  ngOnInit() {
  }

  alertButtons=[{
    text:'Cancelar',
    role:'destructive',
    handler:()=>{
      console.log('Viaje Cancelado');
    }
  },
    {
      text:'Confirmar',
      role:'cancel',
      handler: async ()=>{
        await this._toastService.showToast('Viaje cancelado con exito');

      }
    }]



  newRideAlertButtons=[{
    text:'Cancelar',
    role:'destructive',
    handler:()=>{
      console.log('Viaje Cancelado');
    }
  },
    {
      text:'Confirmar',
      role:'cancel',
      handler: async ()=>{
        await this._toastService.showToast('Viaje aceptado con exito');

      }
    }]



  openOrCloseAlert():void{
    this.showAlert.update((currentValue)=>!currentValue)
  }


  async acceptCancelRideAlert():Promise<void>{
    await this._alertService.showAlert({
      header:'Nuevo viaje a Mall galerias',
      subHeader:'Deseas aceptar el viaje?',
      message:'Destino Mall Galerias\nDistancia"5km\nTarifa: HNL 10.00',
      buttons:this.newRideAlertButtons
    })


  }



  async confirmCancelRideAlert():Promise<void>{
    await this._alertService.showAlert({
      header:'Cancelacion del viaje',
      subHeader:'Estas seguro de cancelar el viaje?',
      message:'esta accion no se puede revertir',
      buttons:this.alertButtons
    })
  }

}
