import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {CloudinaryDto} from "../../dtos/shared/cloudinary.dto";
import {Observable} from "rxjs";
const API_URL=`${environment.CLOUDINARY_API}`


@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  private readonly _http: HttpClient = inject(HttpClient);

  // uploadImage(input: CloudinaryDto): Observable<string> {
  //   let formData = new FormData();
  //   formData.append('file', input.file);
  //   formData.append('upload_preset', 'ml_default');
  //   formData.append('folder', input.folder);
  //   return this._http.post<{ secure_url: string }>(API_URL, formData).pipe(
  //     map(response => response.secure_url),
  //   )
  // }


}
