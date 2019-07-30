import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormDemoComponent } from './reactive-form-demo/reactive-form-demo.component';
import { TemplateFormDemoComponent } from './template-form-demo/template-form-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveFormDemoComponent,
    TemplateFormDemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
