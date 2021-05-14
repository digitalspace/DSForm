import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { SearchRegistrationComponent } from './search-registration/search-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    SearchRegistrationComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
