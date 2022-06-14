import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RanksPage } from './ranks.page';

const routes: Routes = [
  {
    path: '',
    component: RanksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RanksPageRoutingModule {}
