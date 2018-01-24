import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {FootballGames} from './FootballGames';
import {Fixture} from './fixture';
import {Game} from '../entities/Game';
import {Comment} from '../entities/Comment';
import {Rating} from '../entities/Rating';

@Injectable()
export class GameService {


  constructor(private _http: Http) {

  }


  getAllGamesFromAPI(): Promise<FootballGames> {
    const headers = new Headers();
    headers.append('X-Auth-Token', '073055c75ffe42be95808bc4397d6a5b');

    return this._http.get('http://api.football-data.org/v1/fixtures/', {
      headers: headers
    })
      .toPromise()
      .then(response => response.json() as FootballGames);
  }

  insertNewGame(footballGames: Fixture[]): Promise<any> {
    return this._http.post('https://sport-history-backend-api.herokuapp.com/api/games', footballGames,
      {
        withCredentials: true
      })
      .toPromise();
  }

  getAllGamesFromBackend(): Promise<Game[]> {
    return this._http.get('https://sport-history-backend-api.herokuapp.com/api/games', {
      withCredentials: true
    }).toPromise()
      .then(response => response.json() as Game[]);
  }

  getGameFromBackend(id: string): Promise<Game> {
    return this._http.get('https://sport-history-backend-api.herokuapp.com/api/games/' + id, {
      withCredentials: true
    }).toPromise()
      .then(response => response.json() as Game);
  }

  sendComment(comment: Comment): Promise<any> {

    return this._http.post('https://sport-history-backend-api.herokuapp.com/api/comments', comment, {
      withCredentials: true
    })
      .toPromise()
      .then(response => response.json() as Comment);
  }

  getAllComments(id: string): Promise<Comment[]> {
    const comment = new Comment();
    comment.matchId = id;
    return this._http.put('https://sport-history-backend-api.herokuapp.com/api/comments', comment, {
      withCredentials: true
    }).toPromise()
      .then(response => response.json() as Comment[]);
  }

  sendRating(rating: Rating): Promise<any> {

    return this._http.post('https://sport-history-backend-api.herokuapp.com/api/rating', rating, {
      withCredentials: true
    })
      .toPromise()
      .then(response => response.json() as Rating);
  }

  getRating(rating: Rating): Promise<any> {
    return this._http.put('https://sport-history-backend-api.herokuapp.com/api/rating', rating, {
      withCredentials: true
    }).toPromise()
      .then(response => response.json() as Rating []);
  }

}
