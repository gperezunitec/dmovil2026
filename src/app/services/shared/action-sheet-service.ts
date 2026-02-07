import {inject, Injectable} from '@angular/core';
import {ActionSheetController} from "@ionic/angular";
import {ActionSheetDto} from "../../dtos/shared/action-sheet-dto";

@Injectable({
  providedIn: 'root',
})
export class ActionSheetService {
  private readonly _actionSheetController=inject(ActionSheetController);


  async showActionSheet(input:ActionSheetDto):Promise<void> {
    if(!input) {
      throw new Error("Input is required");
    }
    if (input.buttons.length ===0) {
      throw new Error("At least one button is required");
    }


    const actionSheet = await this._actionSheetController.create({
      header:input.header,
      subHeader:input.subHeader,
      buttons:input.buttons,
      mode:'ios'
    })
    await actionSheet.present();


  }

}
