import { DBKey, DBService } from './../service/db.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question, QuestionDifficulty, QuestionType} from '../service/trivia.data';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})

export class QuestionPage implements OnInit {

  readonly TAG : string = "QuestionPage";

  // All our datas
  listQuestion : Question[] = [];
  currentQuestion: Question;
  allAnswers : string[] = [];

  // Timer
  readonly timerInSeconds : number = 10;
  // Timer -> bar 
  p_value_timer : number = 0.0

  // Count till MaxQuestion 
  counter : number = 0;
  maxQuestion : number

  // Score
  score : number = 0;
  points : number = 0;

  // Only one try per question
  numTries : number = 0;

  // Game parameters 
  duration : string
  totalScore : number

  constructor(private dbService : DBService,  private route: Router) {}

  // Getting values from DB and capacitor storage
  async getValuesFromDB(){    
    this.duration = await this.dbService.getValue(DBKey.Duration);
    this.totalScore = Number(await this.dbService.getValue(DBKey.Score));
  }
  
  async ngOnInit() {
    console.log(`${this.TAG} init`);

    // Getting my list of questions from the menu page
    this.listQuestion = this.route.getCurrentNavigation().extras.state as Question[];

    // Getting game parameters from my database
    await this.getValuesFromDB();

    // Setting up maxQuestion
    this.maxQuestion = +this.duration
    
    console.log(`${this.TAG} strating quiz`);
    this.quiz()
  }

  quiz(){
    this.initializeQuiz()

    setInterval(async () => {      
      this.setupTimer()
       
      this.allAnswers = []
      this.resetCSS()
      this.counter++;
      this.currentQuestion = this.listQuestion[this.counter];

      this.numTries = 0;

      if(this.currentQuestion != undefined){      
        this.allAnswers.push(this.currentQuestion.correct_answer)
        this.allAnswers = this.allAnswers.concat(this.currentQuestion.incorrect_answers)
        this.allAnswers = this.shuffleAnswers(this.allAnswers)
      }

      // At the end, adding points 
      if(this.counter === this.maxQuestion){
        await this.dbService.setValue(DBKey.Score, String(this.totalScore + this.points))
      }

    }, this.timerInSeconds * 1000);    
  }

  // Initialize datas
  initializeQuiz(){
    this.currentQuestion = this.listQuestion[0];
    this.setupTimer()

    this.allAnswers.push(this.currentQuestion.correct_answer)
    this.allAnswers = this.allAnswers.concat(this.currentQuestion.incorrect_answers)
    this.allAnswers = this.shuffleAnswers(this.allAnswers)
  }

  // Checking if we pick the right answer
  checkIfIamRight(input : string, item : string){
    const myAnswer = document.getElementById(item);      
    this.numTries++;

    // If this is our first try
    if(this.numTries === 1){
      
      // Comparing the correct_answer with the input
      if(this.currentQuestion.correct_answer === input){
        // Increasing score
        this.score++;

        // Increasing points
        switch(this.currentQuestion.difficulty.toString()){
          case "hard":{
            this.points += 3; break;
          }
          case "medium":{
            this.points += 2; break;
          }
          case "easy":{
            this.points += 1; break;
          }
        }

        // Coloring the good answer
        myAnswer.style.border = "4px solid #5DCC68";
      }else{

        // Coloring the false answer
        myAnswer.style.border = "4px solid red";

        // Seeking for the right answer and then coloring it
        var ct = 0;
        this.allAnswers.forEach(element => {
          if(element === this.currentQuestion.correct_answer){
            const myAnswer = document.getElementById('item' + ct);      
            myAnswer.style.border = "6px solid #5DCC68";
          }
          ct++;
        });
      }
    }    
  }

  // Shuffle answers
  shuffleAnswers(input : string[]){
    if(input.length == 2){
      return ["True", "False"]
    }else{
      return input.sort(() => (Math.random() > .5) ? 1 : -1);
    }
  }

  // The url is encoded twice => cf. Trivia API
  decodeURI(input : string){
    return decodeURIComponent(decodeURIComponent(input));
  }

  // Reset the CSS of each box at each question
  resetCSS(){
    const ionItem = Array.from(
      document.getElementsByTagName('ion-item')
    );

    ionItem.forEach(box => {
      box.style.border = '';
    });
  }

  
  // Setting timer parameters
  async setupTimer(){
    this.p_value_timer = 0
    for(let i = 0; i <= this.timerInSeconds*10; i++){
      await delay(100)
      this.p_value_timer += 1/100;
    }
  }
  
  
  // Back to menu at the end of the quiz
  goToMenu(){
    console.log(`${this.TAG} goToMenu `);
    this.route.navigate(["menu"]);
  }
}


// Useful function

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}