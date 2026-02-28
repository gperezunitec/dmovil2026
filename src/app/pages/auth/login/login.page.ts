import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule} from "@ionic/angular";
import {addIcons} from "ionicons";
import { logInOutline} from "ionicons/icons";
import {LoadingService} from "../../../services/shared/loading-service";
import {LoginDto} from "../../../dtos/auth/login.dto";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule]

})
export class LoginPage implements OnInit {

  private readonly _authService:AuthService =inject(AuthService) ;


  /////////////////////////Formulario//////////////////////////////
  private readonly _formBuilder=inject(FormBuilder);
  readonly loginForm=this._formBuilder.group({
    identifier:['', Validators.required,Validators.email],
    password: ['', Validators.required],

    /// regex  expresiones regulares

  })




  /////////////////////////Getters//////////////////////////////

  get isIdentifierRequired(): boolean {
    const emailControl=this.loginForm.get('identifier');
    return emailControl? emailControl.hasError('required') && emailControl.touched: false;
  }


  get isIdentifierInvalid(): boolean {
    const identifierControl=this.loginForm.get('identifier');
    return identifierControl? identifierControl.hasError('identifier') && identifierControl.touched: false;
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
    const values:LoginDto={
      identifier:this.loginForm.value.identifier ??'',
      password:this.loginForm.value.password ??''
    };

    this._authService.login(values);

  }


  constructor() {
    addIcons({logInOutline})

  }

  ngOnInit() {
  }



}
