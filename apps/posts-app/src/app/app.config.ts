import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { HeaderComponent } from './components/header.component';
import { PostsModule } from './posts/posts.module';
import { PostsComponent } from './posts/posts.component';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    HeaderComponent,
    PostsComponent,
    importProvidersFrom(PostsModule),
  ],
};
