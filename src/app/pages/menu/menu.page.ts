import { DBKey, DBService } from './../service/db.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTriviaSearch, Question } from '../service/trivia.data';
import { TriviaService } from '../service/trivia.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})

export class MenuPage implements OnInit {

  readonly TAG : string = "MenuPage";
  listQuestion : Question[] = [];

  duration : string
  difficulty : string
  type : string

  constructor(private apiTrivia : TriviaService, private dbService : DBService, private activatedRoute: ActivatedRoute, private route: Router) {}

  ngOnInit(){
    console.log(`${this.TAG} init`);    
    this.getValuesFromDB();
  }

  async getValuesFromDB(){
    this.duration = await this.dbService.getValue(DBKey.Duration);
    this.difficulty = await this.dbService.getValue(DBKey.Difficulty);
    this.type = await this.dbService.getValue(DBKey.Type);
  }

  // Getting questions with paramaters from settings
  async gettingQuestionsByCategory(category : number){
    let response : DataTriviaSearch = await this.apiTrivia.getQuestions(category, this.duration, this.difficulty, this.type);
    console.log(`${this.TAG} response ` + response);

    this.listQuestion = response.results;
    console.log(this.listQuestion);

    console.log(`${this.TAG} goToQuestions `);
    this.route.navigate(["question"], {state: this.listQuestion});
  }

}
