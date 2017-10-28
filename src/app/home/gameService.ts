import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Game} from '../entities/game';

@Injectable()
export class GameService {


  constructor(private _http: Http) {

  }

  getAllGames(): Promise<Game> {
    return this._http.get('/api/games/all',
      {
        withCredentials: true
      })
      .toPromise()
      .then(response => response.json() as Game);
  }
}
