import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {FootballGames} from './FootballGames';

@Injectable()
export class GameService {


  constructor(private _http: Http) {

  }


  getAllGames(): Promise<FootballGames> {
    const headers = new Headers();
    headers.append('X-Auth-Token', '073055c75ffe42be95808bc4397d6a5b');

    return this._http.get('http://api.football-data.org/v1/fixtures/',{
      headers: headers
    })
      .toPromise()
      .then(response => response.json() as FootballGames);
  }
}
