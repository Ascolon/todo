import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpService } from './services/http.service';
import { UrlsService } from './services/urls.service';
import { HttpModule } from '@angular/http';
import { FormService } from './services/form.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeFormatPipe } from './pipes/time-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TimeFormatPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [HttpService, UrlsService, FormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
