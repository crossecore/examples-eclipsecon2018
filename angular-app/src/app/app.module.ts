import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialImporterModule } from './material-importer.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialImporterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
