import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DBKey, DBService } from '../service/db.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})

export class SettingPage implements OnInit {

  readonly TAG = "SettingPage"

  // Setting initialized values
  duration : string 
  difficulty : string
  type : string

  // All possibilities
  durations : string[] = ['5', '10', '15', '20', '25', '50']
  difficulties : string[] = ['any', 'easy', 'medium', 'hard']
  types : string[] = ['any', 'multiple', 'boolean']

  constructor(private dbService : DBService, private activatedRoute: ActivatedRoute, private route: Router) {}

  ngOnInit() {
    console.log(`${this.TAG} init`);    
    this.getValuesFromDB()
  }
  
  // Get parameters saved in the database
  async getValuesFromDB(){
    this.duration = await this.dbService.getValue(DBKey.Duration);
    this.difficulty = await this.dbService.getValue(DBKey.Difficulty);
    this.type = await this.dbService.getValue(DBKey.Type);
  }

  // Changing the duration parameter - the amount of questions
  async changeDuration(el : any){
    console.log(`${this.TAG}` + " Set the amount of question to " + el.target.value);
    this.duration = el.target.value
    await this.dbService.setValue(DBKey.Duration, this.duration)
  }

  // Changing the difficulty parameter
  async changeDifficulty(el : any){
    console.log(`${this.TAG}` + " Set the difficulty to " + el.target.value);
    this.difficulty = el.target.value
    await this.dbService.setValue(DBKey.Difficulty, this.difficulty)
  }

  // Changing the type parameter
  async changeType(el : any){
    console.log(`${this.TAG}` + " Set the type of question to " + el.target.value);
    this.type = el.target.value
    await this.dbService.setValue(DBKey.Type, this.type)
  }

  goToMenu(){
    console.log(`${this.TAG} goToMenu `);
    this.route.navigate(["menu"]);
  }

}
