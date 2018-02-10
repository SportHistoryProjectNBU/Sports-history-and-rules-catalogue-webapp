import {Component, OnInit, EventEmitter} from '@angular/core';
import {GameService} from './gameService';
import {FootballGames} from './FootballGames';
import {Game} from '../entities/Game';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable, Observer} from 'rxjs/Rx'

export interface MyReactiveInputEvent {
  term: string;
  observer: Observer<any>;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  footballGames: FootballGames;
  games: Game[];
  sum: number = 20;
  array: Game[] = [];
  searchControl: FormControl = new FormControl();
  onUpdate: EventEmitter<MyReactiveInputEvent> = new EventEmitter()

  constructor(private gameService: GameService,
              private router: Router) {
    this.footballGames = new FootballGames();
    this.gameService.getAllGamesFromAPI().then((resp) => {
      this.footballGames = resp;
      this.gameService.insertNewGame(this.footballGames.fixtures).then((respoz) => {
        this.gameService.getAllGamesFromBackend().then((responseBackend) => {
          this.games = responseBackend;
          this.appendItems(0, this.sum);
        });
      }).catch((error) => {
        if (error.status === 403) {
          localStorage.removeItem('id');
          localStorage.removeItem('name');
          localStorage.removeItem('username');
          localStorage.removeItem('login');
          router.navigateByUrl('/login');
        }
      });
    });
  }

  ngOnInit() {
    this.searchControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap((term: string) => {

        this.array = []

        let items = this.games.filter((e: Game) => {
          return new RegExp(term, 'gi').test(e.homeTeamName) || new RegExp(term, 'gi').test(e.awayTeamName)
        })

        return items;
      })
      .subscribe((item: any) => {
        this.array.push(item);
      });
  }

  search(event: MyReactiveInputEvent) {
    let items = this.games.filter((e: Game) => {
      return new RegExp(event.term, 'gi').test(e.homeTeamName)
    })

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

  moreInformation(footballgame: Game) {
    this.router.navigate(['games', footballgame.id]);
  }

  addItems(startIndex, endIndex) {

    for (let i = startIndex; i < endIndex; ++i) {
      this.array.push(this.games[i]);
    }
  }

  appendItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex);
  }

  onScrollDown (ev) {
    console.log('scrolled down!!', ev);

    // add another 20 items
    const start = this.sum;
    this.sum += 20;
    if(this.sum >= this.games.length) {
      // do nothing
    }else {
      this.appendItems(start, this.sum);
    }
  }
}
