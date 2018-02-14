import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {FootballGames} from './FootballGames';
import {Fixture} from './fixture';
import {Game} from '../entities/Game';
import {Comment} from '../entities/Comment';
import {Rating} from '../entities/Rating';
import {Subscribe} from "../entities/Subscribe";
import {Observable} from "rxjs/Observable";

@Injectable()
export class GameService {


  constructor(private _http: Http) {

  }

  getAllGamesFromAPI2() : Observable<any> {
    const headers = new Headers();
    headers.append('X-Auth-Token', '073055c75ffe42be95808bc4397d6a5b');

    return this._http.get('http://api.football-data.org/v1/fixtures/', {
      headers: headers
    }).map(data => data.json() as FootballGames);
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
    return this._http.post('/api/games', footballGames,
      {
        withCredentials: true
      })
      .toPromise();
  }

  getAllGamesFromBackend(): Promise<Game[]> {
    return this._http.get('/api/games', {
      withCredentials: true
    }).toPromise()
      .then(response => response.json() as Game[]);
  }

  getGameFromBackend(id: string): Promise<Game> {
    return this._http.get('/api/games/' + id, {
      withCredentials: true
    }).toPromise()
      .then(response => response.json() as Game);
  }

  sendComment(comment: Comment): Promise<any> {

    return this._http.post('/api/comments', comment, {
      withCredentials: true
    })
      .toPromise()
      .then(response => response.json() as Comment);
  }

  getAllComments(id: string): Promise<Comment[]> {
    const comment = new Comment();
    comment.matchId = id;
    return this._http.put('api/comments', comment, {
      withCredentials: true
    }).toPromise()
      .then(response => response.json() as Comment[]);
  }

  sendRating(rating: Rating): Promise<any> {

    return this._http.post('/api/rating', rating, {
      withCredentials: true
    })
      .toPromise()
      .then(response => response.json() as Rating);
  }

  getRating(rating: Rating): Promise<any> {
    return this._http.put('/api/rating', rating, {
      withCredentials: true
    }).toPromise()
      .then(response => response.json() as Rating []);
  }

  getAllIncoming(): Promise<Game[]> {
    return this._http.get('/api/games/incoming', {
      withCredentials: true
    }).toPromise()
      .then(response => response.json() as Game[]);
  }

  subscribeForGame(subscribe: Subscribe): Promise<any> {
    return this._http.post('/api/subscribe', subscribe, {
      withCredentials: true
    }).map((resp) => resp.json())
      .toPromise();
  }

  getAllSubscribesForUser2(): Observable<any> {
    const subscribe = new Subscribe();
    subscribe.userId = localStorage.getItem('id');
    return this._http.put('/api/subscribe/userSubscribe', subscribe, {
      withCredentials: true
    }).map(data => data.json() as Subscribe[]);
  }

  getAllSubscribesForUser(): Promise<any> {
    const subscribe = new Subscribe();
    subscribe.userId = localStorage.getItem('id');
    return this._http.put('/api/subscribe/userSubscribe', subscribe, {
      withCredentials: true
    }).toPromise()
      .then(response => response.json() as Subscribe[]);
  }

}
