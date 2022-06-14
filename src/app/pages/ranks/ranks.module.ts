import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RanksPageRoutingModule } from './ranks-routing.module';

import { RanksPage } from './ranks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RanksPageRoutingModule
  ],
  declarations: [RanksPage]
})
export class RanksPageModule {}
