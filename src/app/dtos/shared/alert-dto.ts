import {AlertButton} from "@ionic/angular";

export interface AlertDto {
  header:string,
  subHeader:string,
  message:string,
  buttons:AlertButton[]
}
