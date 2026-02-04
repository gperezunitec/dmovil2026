import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CaneraService {
  enableCamera:WritableSignal<boolean>=signal(true);
  photoCounter:WritableSignal<number>=signal(0)
}
