import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HeroComponent } from "./hero/hero.component";
import { ListComponent } from "./list/list.component";
import { DbzService } from "../dbz/services/dbz.service";


@NgModule({
  exports: [
    HeroComponent,
    ListComponent
  ],

  declarations: [
    HeroComponent,
    ListComponent
  ],

  providers: [
  ],

  imports: [
    CommonModule,
  ]

})

export class HeroesModule {}
