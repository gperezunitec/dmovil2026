import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ToastService} from "../shared/toast-service";
import {LoadingService} from "../shared/loading-service";
import {PhotoDto} from "../../dtos/photos/photo-dto";
import {LoginDto} from "../../dtos/auth/login.dto";
import {TokenResponseDto} from "../../dtos/auth/token-response.dto";


const API_URL:string = `${environment.API_URL}auth/`;


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly _httpClient:HttpClient=inject(HttpClient);
  private readonly _toastService:ToastService=inject(ToastService);
  private readonly _loadingService:LoadingService=inject(LoadingService);


  async login(credentials:LoginDto):Promise<void>{
    await this._loadingService.createLoading('Iniciando Sesion')
    this._httpClient.post<TokenResponseDto>(`${API_URL}login`, {...credentials,method:0}).subscribe({
      next:async (response:TokenResponseDto)=>{
        if(response){
          await this._loadingService.closeLoading();
          await this._toastService.showToast('Inicio de Sesion Exitoso')
        }
      },
      error: async (error:Error) => {
        await this._loadingService.closeLoading();
        await this._toastService.showToast(
          'Ha ocurrido un error',
          true,
        )
      }
    })
  }


}
