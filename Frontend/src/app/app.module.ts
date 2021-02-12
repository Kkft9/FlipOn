

import { RouteReuseStrategy } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import {HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';




@NgModule({
declarations: [
  AppComponent,
  HeaderComponent,
  FooterComponent,
  LoginComponent,
  SignupComponent,
  ProfileComponent,

  HomeComponent,


],
imports: [BrowserModule, IonicModule.forRoot(),

  AppRoutingModule, FormsModule,
  HttpClientModule
],
providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
