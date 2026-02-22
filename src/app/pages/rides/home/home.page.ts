import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonToast, IonItem, IonLabel
} from '@ionic/angular/standalone';
import {ToastService} from "../../../services/shared/toast-service";
import {PhotoApiService} from "../../../services/photos/photo-api-service";
import {PhotoDto} from "../../../dtos/photos/photo-dto";
import {AlertService} from "../../../services/shared/alert-service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonToast, IonItem, IonLabel],
})
export class HomePage implements OnInit {
  constructor() {}

  private readonly _photoAPiService: PhotoApiService = inject(PhotoApiService);
  private readonly _alertService: AlertService = inject(AlertService);
  private readonly _toastService: ToastService = inject(ToastService);

  showToast: WritableSignal<boolean> = signal(false);
  photos: WritableSignal<PhotoDto[]> = this._photoAPiService.photos;
  photo: WritableSignal<PhotoDto[] | null> = this._photoAPiService.photo;

  newRideAlertButtons = [
    { text: 'ok', role: 'confirm', handler: () => {} }
  ]

  openToast(): void { this.showToast.set(true); }
  dimissToast(): void { this.showToast.set(false); }
  openOrCloseToast(): void { this.showToast.update((current) => !current); }

  async openToastService(): Promise<void> {
    await this._toastService.showToast('Bienvenido a ionic');
    await this._toastService.showToast('A ocurrido un error', true);
  }

  ngOnInit() {
    this._photoAPiService.getAllPhotos();
  }

  async getPhotoById(id: number): Promise<void> {
    const value: PhotoDto = await this._photoAPiService.getPhotoById(id);

    await this._alertService.showAlert({
      header: `Nuevo viaje a ${value.title}`,
      subHeader: 'Deseas aceptar el nuevo viaje',
      message: 'Destino: Mall Galerias\nDistancia: 5m\nTarifa: 200',
      buttons: this.newRideAlertButtons
    });
  }

  createPhoto(): void {
    const newPhoto: PhotoDto = {
      id: 0, title: 'Nueva Foto', url: '', thumbnailUrl: '', album: 1,
    }
    this._photoAPiService.createPhoto(newPhoto);
  }

  deletePhoto(id: number): void {
    this._photoAPiService.showAlertWhenDeletePhoto(id);
  }
}
