import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {FootballGames} from './FootballGames';
import {Fixture} from './fixture';
import {Game} from '../entities/Game';

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

}
