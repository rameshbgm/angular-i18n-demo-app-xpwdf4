import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

// transloco
import { translocoLoader } from './transloco.loader';
import { TranslocoModule, TRANSLOCO_CONFIG, TranslocoConfig } from '@ngneat/transloco';

// import your locales
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeGb from '@angular/common/locales/en-GB';

registerLocaleData(localeFr, 'fr');
registerLocaleData(localeGb, 'en-GB');

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    TranslocoModule,
    HttpClientModule
  ],
  declarations: [ AppComponent ],
  providers: [{
      provide: TRANSLOCO_CONFIG,
      useValue: {
        listenToLangChange: true,
        defaultLang: 'en',
        fallbackLang: 'en',
        prodMode: false
      } as TranslocoConfig
    },
    translocoLoader
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
