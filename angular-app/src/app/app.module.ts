import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialImporterModule } from './material-importer.module';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProgramComponent } from './program/program.component';
import { ProfileComponent } from './profile/profile.component';
import { InfoComponent } from './info/info.component';

const appRoutes: Routes = [
  { path: 'program', component: ProgramComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'info', component: InfoComponent },
  { path: '',
    redirectTo: '/program',
    pathMatch: 'full'
  },
]


@NgModule({
  declarations: [
    AppComponent,
    ProgramComponent,
    ProfileComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    MaterialImporterModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
    // other imports here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
