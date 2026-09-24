import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { Routes } from '@angular/router';
import { provideServerRendering, ServerRoute, withRoutes } from '@angular/ssr';
import { createAppConfig } from './app.config';

export function createServerAppConfig(routes: Routes, serverRoutes: ServerRoute[]) {
  const appConfig = createAppConfig(routes);
  const serverConfig: ApplicationConfig = {
    providers: [provideServerRendering(withRoutes(serverRoutes))],
  };

  return mergeApplicationConfig(appConfig, serverConfig);
}
