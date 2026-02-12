import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ToastService} from "../shared/toast-service";
import {PhotoDto} from "../../dtos/photos/photo-dto";
import {AlertService} from "../shared/alert-service";
import {LoadingService} from "../shared/loading-service";

const API_URL = `${environment.API_URL}photos`;

@Injectable({
  providedIn: 'root',
})
export class PhotoApiService {

  private readonly _httpClient=inject(HttpClient);
  private readonly _toastService=inject(ToastService);
  private readonly _alertsService=inject(AlertService);
  private readonly _loadingService=inject(LoadingService);

  photos:WritableSignal<PhotoDto[]>=signal<PhotoDto[]>([]);
  photo:WritableSignal<PhotoDto|null>=signal<PhotoDto|null>(null);


  alerButtons=[
    {
      text:'Cancelar',
      role:'destructive',
      handler: (id:number) => {

      }
    }
  ]


 async createPhoto(photo:PhotoDto):Promise<void>{
    await this._loadingService.createLoading('Creando Foto')
    this._httpClient.post<PhotoDto>(API_URL, photo).subscribe({
      next:async (response:PhotoDto)=>{
        if(response){
          this.photos.update((currentPhotos)=>[...currentPhotos,response]);
          await this._loadingService.closeLoading();
          await this._toastService.showToast('Foto creada con exito')
        }
      },
      error: async (error:Error) => {
        await this._loadingService.closeLoading();
        await this._toastService.showToast(
          'Ha ocurrido un error en el photo',
          true,
        )
      }
    })
  }


  async updatePhoto(photo:PhotoDto):Promise<void>{
    await this._loadingService.createLoading('Actualizando Foto'),
    this._httpClient.put<PhotoDto>(`${API_URL}/${photo.id}`,photo).subscribe({
      next:async (response:PhotoDto)=>{
        if(response){
          await this._loadingService.closeLoading();
          this.photo.update((currentPhotos)=>{
            const index=currentPhotos.findIndex((p)=>p.id===response.id);
            if (index !== -1){
              const updatePhotos=[...currentPhotos];
              updatePhotos[index]=response;
              return updatePhotos
            }
            return currentPhotos
          })
          await this._toastService.showToast('Foto creada con exito')
        }
      },
      error: async (error:Error) => {
        await this._loadingService.closeLoading();
        await this._toastService.showToast(
          'Ha ocurrido un error en el photo',
          true,
        )
      }
    })
  }




 newRiodeAlertButtons=[
    {
      text:'ok',
      role:'confirm',
      handler: (id:number) => {

      }
    }
  ]



  async getAllPhotos():Promise<void>{
     await this._loadingService.createLoading('Obteniendo fotos...')

    this._httpClient.get<PhotoDto[]>(API_URL).subscribe({
      next:(response:PhotoDto[])  => {
        console.log(response);
        this.photos.set(response);
        this._loadingService.closeLoading()

      },
      error: async(error) => {
        console.error('Ha ocurrido un error:', error);
        await this._toastService.showToast(
          'Ha Ocurrido un error al obtener las fotos',
          true,
        )
      }
    })
}



  getPhotoById(id: number): void {
    this._httpClient.get<PhotoDto>(`${API_URL}/${id}`).subscribe({
      next: (response: PhotoDto) => {
        console.log(response);
        this.photo.set(response); // Assuming this.photo is a WritableSignal
      },
      error: async (error) => {

        console.error('Ha ocurrido un error:', error);

        await this._toastService.showToast(
          'Ha ocurrido un error al obtener la foto',
          true
        );
      }
    });
  }


  deletePhotoById(id: number): void {
    this._httpClient.delete(`${API_URL}/${id}`).subscribe({
      next:async ()  => {
        await this._toastService.showToast('Foto eliminada con exito')
        this.photos.update((currentPhotos)=>currentPhotos.filter(p=>p.id!==id))
      },
      error:async(error) => {
        await this._toastService.showToast(
          'Ha ocurrido un error al obtener la foto',
          true,
        )
      }
    })
  }



  async showAlertWhenDeletePhoto(id:number):Promise<void>{

    await this._alertsService.showAlert({
      header:'Cancelacion de viaje',
      subHeader: 'Estas segurio de que deseas cancelar el viaje',
      message:'Esta accion no se puede revertir',
      buttons:[
        {
          text:'Cancelar',
          role:'destructive',
          handler:()=>{
            console.log('Viaje Cancelado');
          }
        },
        {
          text:'Confirmar',
          role:'cancel',
          handler:()=>{
            this.deletePhotoById(id)
          }
        }
      ]
    })


  }

}
