import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { IconDefinition } from '@ant-design/icons-angular';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { LockOutline, MailOutline, PhoneOutline, UserOutline } from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [LockOutline, UserOutline, PhoneOutline, MailOutline];

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideRouter(appRoutes), provideNzIcons(icons)],
};
