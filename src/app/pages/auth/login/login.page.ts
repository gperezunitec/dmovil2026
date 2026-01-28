import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule} from "@ionic/angular";
import {addIcons} from "ionicons";
import { logInOutline} from "ionicons/icons";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule]

})
export class LoginPage implements OnInit {

  private readonly _formBuilder=inject(FormBuilder);
  readonly loginForm=this._formBuilder.group({
    email:['', Validators.required],
    password: ['', Validators.required],
  })




  constructor() {
    addIcons({logInOutline})

  }

  ngOnInit() {
  }

}
