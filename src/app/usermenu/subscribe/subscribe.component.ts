///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, OnInit, EventEmitter} from '@angular/core';

import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable, Observer} from 'rxjs/Rx';
import {MyReactiveInputEvent} from '../../home/home.component';
import {FootballGames} from '../../home/FootballGames';
import {Game} from '../../entities/Game';
import {GameService} from '../../home/gameService';
import {Subscribe} from '../../entities/Subscribe';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  footballGames: FootballGames;
  games: Game[];
  sum = 20;
  array: Game[] = [];
  searchControl: FormControl = new FormControl();
  subscribes: Subscribe[];
  onUpdate: EventEmitter<MyReactiveInputEvent> = new EventEmitter();

  constructor(private gameService: GameService,
              private router: Router) {
    this.footballGames = new FootballGames();
    this.gameService.getAllSubscribesForUser().then((response) => {
      this.subscribes = response;
      this.gameService.getAllIncoming().then((responseBackend) => {
        this.games = responseBackend;
        this.appendItems(0, this.sum);
      });
    });


  }

  ngOnInit() {
    this.searchControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap((term: string) => {

        this.array = [];

        const items = this.games.filter((e: Game) => {
          return new RegExp(term, 'gi').test(e.homeTeamName) || new RegExp(term, 'gi').test(e.awayTeamName);
        });

        return items;
      })
      .subscribe((item: any) => {
        this.array.push(item);
      });
  }

  search(event: MyReactiveInputEvent) {
    const items = this.games.filter((e: Game) => {
      return new RegExp(event.term, 'gi').test(e.homeTeamName);
    });

    Observable.from(items)
      .subscribe(event.observer);
  }


  footballStatus(footballgame: Game) {
    if (footballgame.status === 'TIMED') {
      return 1;
    } else if (footballgame.status === 'IN_PLAY') {
      return 2;
    } else if (footballgame.status === 'CANCELED') {
      return 3;
    } else if (footballgame.status === 'FINISHED') {
      return 4;
    } else if (footballgame.status === 'POSTPONED') {
      return 5;
    } else if (footballgame.status === 'SCHEDULED') {
      return 6;
    } else {
      return 7;
    }
  }

  subscribe(element, footballgame: Game) {
    const subscribe = new Subscribe();
    subscribe.matchId = footballgame.id;
    subscribe.userId = localStorage.getItem('id');
    this.gameService.subscribeForGame(subscribe).then((resp) => {
      if (resp.subscribe === 'insert') {
        element.textContent = 'Remove Subscribe';
        alert('Successfully subscribed for a game. You will receive e-mail 1 hour before the game!');
      } else {
        alert('Successfully remove a subscribe for a game!');
        element.textContent = 'Subscribe';
      }
    });
  }

  addItems(startIndex, endIndex) {

    for (let i = startIndex; i < endIndex; ++i) {
      this.array.push(this.games[i]);
    }
  }

  appendItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex);
  }

  onScrollDown(ev) {
    console.log('scrolled down!!', ev);

    // add another 20 items
    const start = this.sum;
    this.sum += 20;
    if (this.sum >= this.games.length) {
      // do nothing
    } else {
      this.appendItems(start, this.sum);
    }
  }

  checkForSubscribe(matchId: String) {
    let isSubscribed = false;
    this.subscribes.forEach(function (subscribe) {
      if (subscribe.matchId === matchId) {
        isSubscribed = true;
      }
    });
    return isSubscribed;
  }
}
