import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { SiteApp } from '@shared';
import { config } from './app/app.config.server';

const bootstrap = (context: BootstrapContext) => bootstrapApplication(SiteApp, config, context);

export default bootstrap;
