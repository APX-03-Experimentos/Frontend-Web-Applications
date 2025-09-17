import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';

@Component({
  selector: 'app-language-switcher',
  imports: [
    MatButtonToggle,
    MatButtonToggleGroup
  ],
  templateUrl: './language-switcher.html',
  standalone: true,
  styleUrl: './language-switcher.css'
})
export class LanguageSwitcher {
  protected currentLanguage: string = 'en';
  protected languages: string[] = ['en', 'es'];

  constructor(private translate: TranslateService) {
    this.currentLanguage = this.translate.getCurrentLang();
  }

  useLanguage(language: string): void {
    this.translate.use(language);
    this.currentLanguage = language;
  }
}
