import {inject, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {PreferencesService} from "../../services/shared/preferences-service";


@Injectable({
  providedIn: 'root',
})

export class AuthGuard{
  private readonly _preferenceService: PreferencesService=inject(PreferencesService);
  private readonly _router: Router=inject(Router);

  async canActivate(): Promise<boolean> {
    const accessToken:string|null=await this._preferenceService.get('accessToken');
    if(!accessToken){
      this._router.navigate(['/login']);
    }
    return true;
  }


}
