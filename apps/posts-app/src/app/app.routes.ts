import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'posts',
    loadComponent: () =>
      import('./posts/posts.component').then((m) => m.PostsComponent),
  },
  {
    path: 'suc',
    loadComponent: () =>
      import('./components/sentenceUpdate.component').then(
        (c) => c.SentenceUpdateComponent
      ),
  },
  {
    path: 'page',
    loadComponent: () =>
      import('./components/pagination.component').then(
        (c) => c.PagiantionComponent
      ),
  },
  {
    path: 'arrSwitch',
    loadComponent: () =>
      import('./components/arraySwitch.component').then(
        (c) => c.ArraySwitchComponent
      ),
  },
  {
    path: 'stopwatch',
    loadComponent: () =>
      import('./components/stopWatch.component').then(
        (c) => c.StopwatchComponent
      ),
  },
  {
    path: 'checkbox',
    loadComponent: () =>
      import('./components/checkbox-tree.comonent').then(
        (c) => c.AppCheckboxTreeComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'posts',
  },
];
