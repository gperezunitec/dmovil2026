import {ActionSheetButton} from "@ionic/angular/standalone";

export interface ActionSheetDto {
  header:string,
  subHeader:string,
  buttons:ActionSheetButton[]
}
