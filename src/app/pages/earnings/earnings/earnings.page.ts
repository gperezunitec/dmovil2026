import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonActionSheet, IonButton, IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {ToastService} from "../../../services/shared/toast-service";
import {ActionSheetService} from "../../../services/shared/action-sheet-service";

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.page.html',
  styleUrls: ['./earnings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonActionSheet]
})
export class EarningsPage implements OnInit {

  private readonly _actionSheetService=inject(ActionSheetService);
  private readonly _toastService=inject(ToastService);
  showActionSheet:WritableSignal<boolean>=signal(false);

  actionSheetButtons=[
    {
      text: 'Descargar reporte de ganancias',
      handler: async () => {
        await this._toastService.showToast('Reporte de ganacias descargado con exito');
      }
    },
    {
      text: 'Compartir reporte de ganancias',
      handler: async () => {
        await this._toastService.showToast('Reporte de ganacias descargado con exito');
      }
    }
  ]







  constructor() { }

  ngOnInit() {
  }


  openOrCloseActionSheet(){
    this.showActionSheet.update((currentValue)=>!currentValue);
  }

  async showEarningsActionSheet():Promise<void> {
    await this._actionSheetService.showActionSheet({
      header:'Opciones de reporte de ganacias',
      subHeader:'Selecciona una accion para tu Reporte de ganacias',
      buttons:this.actionSheetButtons
    })
  }

}
