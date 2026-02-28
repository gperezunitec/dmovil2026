import { Injectable } from '@angular/core';
import {Camera,CameraResultType} from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class CameraService {


  async checkPermissions(): Promise<boolean> {
    const checkPermissions=await Camera.checkPermissions();
    return checkPermissions.camera==='granted' && checkPermissions.photos==='granted';
  }


  async openCameraOrGallery(): Promise<string> {
    const image=await Camera.getPhoto({
      quality:100,
      allowEditing:false,
      resultType:CameraResultType.Base64,
      saveToGallery:true,
      promptLabelHeader:'Seleccionar Foto',
      promptLabelPhoto:'Tomar foto',
      promptLabelPicture:'Seleccione um imagen',
      promptLabelCancel:'Cancelar',
    });

    if (!image){
      return '';
    }

    return `data:image/${image.format};base64,${image.base64String}`;
  }



}
