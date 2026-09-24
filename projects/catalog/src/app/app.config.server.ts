import { createServerAppConfig } from '@shared';
import { routes } from './app.routes';
import { serverRoutes } from './app.routes.server';

export const config = createServerAppConfig(routes, serverRoutes);
