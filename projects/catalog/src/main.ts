import { bootstrapApplication } from '@angular/platform-browser';
import { SiteApp } from '@shared';
import { appConfig } from './app/app.config';

bootstrapApplication(SiteApp, appConfig).catch((err) => console.error(err));
