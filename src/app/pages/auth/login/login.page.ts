import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule} from "@ionic/angular";
import {addIcons} from "ionicons";
import { logInOutline} from "ionicons/icons";
import {LoadingService} from "../../../services/shared/loading-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule]

})
export class LoginPage implements OnInit {

  private readonly _loadingService = inject(LoadingService);

  /////////////////////////Formulario//////////////////////////////
  private readonly _formBuilder=inject(FormBuilder);
  readonly loginForm=this._formBuilder.group({
    email:['', Validators.required,Validators.email],
    password: ['', Validators.required],

    /// regex  expresiones regulares

  })




  /////////////////////////Getters//////////////////////////////

  get isEmailRequired(): boolean {
    const emailControl=this.loginForm.get('email');
    return emailControl? emailControl.hasError('required') && emailControl.touched: false;
  }


  get isEmailInvalid(): boolean {
    const emailControl=this.loginForm.get('email');
    return emailControl? emailControl.hasError('email') && emailControl.touched: false;
  }


  get isPasswordRequired(): boolean {
    const passwordControl=this.loginForm.get('password');
    return passwordControl? passwordControl.hasError('required') && passwordControl.touched: false;
  }

  get isFormInvalid():boolean{
    return this.loginForm.invalid;
  }

  onSubmit() {
    if (this.isFormInvalid) return;
    const values=this.loginForm.value;
    this._loadingService.createLoading();
    console.log(values);
    this._loadingService.closeLoading()
  }


  constructor() {
    addIcons({logInOutline})

  }

  ngOnInit() {
  }



}
