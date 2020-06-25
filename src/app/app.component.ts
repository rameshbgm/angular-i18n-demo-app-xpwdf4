import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'i18n demo 🇺🇸🇬🇧🇫🇷';
  currentDate = new Date();

  // the locales the app supports
  locales = [
    { label: '🇺🇸 English (US)', value: 'en-US' },
    { label: '🇬🇧 English (UK)', value: 'en-GB' },
    { label: '🇫🇷 Français', value: 'fr' }
  ];
  // the user's locale
  detectedLocale = '';
  // the default locale
  locale = this.locales[0].value;

  constructor(private translocoService: TranslocoService) {
    this.detectedLocale = this.getUsersLocale('en-US');

    // generate a regex from the locales we support
    const supportedRegex = new RegExp('^' + this.locales.map(l => l.value.substring(0, 2)).join('|^'));
    // check if the user's preferred language is supported and if so, use it.
    if (this.detectedLocale.match(supportedRegex)) {
      this.updateLocale(this.detectedLocale);
    }
  }

  getUsersLocale(defaultValue: string): string {
    if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
      return defaultValue;
    }
    const wn = window.navigator as any;
    let lang = wn.languages ? wn.languages[0] : defaultValue;
    lang = lang || wn.language || wn.browserLanguage || wn.userLanguage;
    return lang;
  }
  // change locale/language at runtime
  updateLocale(locale) {
    console.log('update locale', locale);
    if (this.locales.some(l => l.value === locale)) {
      this.locale = locale;
    }
    const lang = locale.substring(0, 2);
    this.translocoService.setActiveLang(lang);
  }
}
