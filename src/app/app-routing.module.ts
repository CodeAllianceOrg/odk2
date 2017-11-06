import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';

import {AboutComponent} from './about/about.component';
import {EditorComponent} from './editor/editor.component';

const routes: Route[] = [
  {
    path: '',
    component: EditorComponent
  },
  {
    'path': 'about',
    component: AboutComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
