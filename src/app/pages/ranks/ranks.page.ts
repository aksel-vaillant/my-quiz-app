import { Component, OnInit, ViewChild } from '@angular/core';
import { DBKey, DBService } from '../service/db.service';
import { User } from '../service/trivia.data';

@Component({
  selector: 'app-ranks',
  templateUrl: './ranks.page.html',
  styleUrls: ['./ranks.page.scss'],
})
export class RanksPage implements OnInit {

  readonly TAG : string = "RankPage";

  users : User[]
  score : string

  constructor(private dbService : DBService) { }

  ngOnInit() {
    console.log(`${this.TAG} init`);
    this.getValuesFromDB();
  }

  // Getting values from DB and capacitor storage
  async getValuesFromDB(){
    console.log(`${this.TAG} gettingValuesFromDB`);
    // Getting my list of fake users    
    this.users = await this.dbService.getObject(DBKey.Users);

    // Getting my saved score
    this.score = await this.dbService.getValue(DBKey.Score);

    this.users.push({ "pseudo" : "Me", "score" : Number(this.score)});
    
    // Sorting users by score
    this.users = this.users.sort((a, b) => 0 - (a.score > b.score ? 1 : -1 ));
  }

  // Scroll to the correct my score/item
  findMe() {
    console.log(`${this.TAG} findMe`);    
    document.getElementById("Me").scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
  }
}
