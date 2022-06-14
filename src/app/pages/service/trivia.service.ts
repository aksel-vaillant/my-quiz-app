import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataTriviaSearch } from './trivia.data';

@Injectable({
    providedIn: 'root'
})

export class TriviaService {

  readonly TAG : string = "TriviaService";

  constructor(private http: HttpClient) {}

  getQuestions(category : number, duration : string, difficulty : string, type : string):Promise<DataTriviaSearch> {
    // No category => all questions
    let url: string = "";
    url = `https://opentdb.com/api.php?encode=url3986&category=` + category;

    if(duration != null)
      url += '&amount=' + duration 
    if(difficulty != null && difficulty != "any")
      url += '&difficulty=' + difficulty
    if(type != null && type != "any")
      url += "&type=" + type

    console.log(`${this.TAG} getQuestions`);
    console.log(`${this.TAG} url: ${url}`);

    return new Promise(resolve => { 
      this.http.get(url).subscribe(data => {
      let json: DataTriviaSearch = data as DataTriviaSearch ;
      resolve(json); }, err => {
        console.log(err); 
      });
    }); 
  }

}