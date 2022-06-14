import { Component } from '@angular/core';
import { PreloadAllModules, Router, RouterModule, Routes } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  readonly TAG : string = "HomePage";

  constructor(private route : Router) {
  }

  goToMenu(){
    console.log(`${this.TAG} goToMenu `);
    this.route.navigate(["menu"]);
  }

  goToSettings(){
    console.log(`${this.TAG} goToSettings `);
    this.route.navigate(["setting"]);
  }

  goToRanks(){
    console.log(`${this.TAG} goToRanks `);
    this.route.navigate(["ranks"]);
  }
}
