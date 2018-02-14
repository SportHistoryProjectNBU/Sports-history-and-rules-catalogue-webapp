import {Component, OnInit} from '@angular/core';
import {GameService} from './gameService';
import {FootballGames} from './FootballGames';
import {Game} from '../entities/Game';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable, Observer, Subscription} from 'rxjs/Rx';

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
  busy: Subscription;
  fromDate: Date;
  toDate: Date;

  constructor(private gameService: GameService,
              private router: Router) {
    this.footballGames = new FootballGames();
    this.busy = this.gameService
      .getAllGamesFromAPI2()
      .subscribe(
         data => {
           this.footballGames = data;
           this.gameService.insertNewGame(this.footballGames.fixtures).then(_ => {
                  this.gameService.getAllGamesFromBackend().then((responseBackend) => {
                    this.games = responseBackend;
                    this.appendItems(0, this.sum);
                  });
                });
         });


    // this.gameService.getAllGamesFromAPI().then((resp) => {
    //   this.footballGames = resp;
    //   this.gameService.insertNewGame(this.footballGames.fixtures).then((respoz) => {
    //     this.gameService.getAllGamesFromBackend().then((responseBackend) => {
    //       this.games = responseBackend;
    //       this.appendItems(0, this.sum);
    //     });
    //   }).catch((error) => {
    //     if (error.status === 403) {
    //       localStorage.removeItem('id');
    //       localStorage.removeItem('name');
    //       localStorage.removeItem('username');
    //       localStorage.removeItem('login');
    //       router.navigateByUrl('/login');
    //     }
    //   });
    // });
  }

  get FromDateString(): string
  {
    return this.fromDate.toISOString().replace( 'Z', '' );
  }
  set FromDateString(value: string)
  {
    this.fromDate = new Date(value);
  }

  get ToDateString(): string
  {
    return this.toDate.toISOString().replace( 'Z', '' );
  }
  set ToDateString(value: string)
  {
    this.toDate = new Date(value);
  }

  ngOnInit() {
    const fromDate = new Date();
    fromDate.setHours(0, 0, 0, 0);
    this.fromDate = fromDate;

    const toDate = new Date();
    toDate.setDate(toDate.getDate() + 6);
    toDate.setHours(0, 0, 0, 0);
    this.toDate = toDate;

    this.searchControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap((term: string) => {

        this.array = []

        const items = this.games.filter((e: Game) => {
          return new RegExp(term, 'gi').test(e.homeTeamName) || new RegExp(term, 'gi').test(e.awayTeamName);
        })

        return items;
      })
      .subscribe((item: any) => {
        this.array.push(item);
      });
  }

  search(event: MyReactiveInputEvent) {
    const items = this.games.filter((e: Game) => {
      return new RegExp(event.term, 'gi').test(e.homeTeamName);
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
      if (this.games[i] !== undefined) {
        this.array.push(this.games[i]);
      }
    }
  }

  appendItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex);
  }

  onScrollDown () {
    console.log('fired!!!!!');
    if (this.games !== undefined) {
      // add another 20 items
      const start = this.sum;
      this.sum += 20;
      if (this.sum >= this.games.length) {
        // do nothing
      } else {
        this.appendItems(start, this.sum);
      }
    }
  }

  getByDates() {
    this.busy = this.gameService.getAllGamesFromBackend2().subscribe( data => {
      this.games = data.filter(match => {
        const matchDate = new Date(match.date);
        return matchDate >= this.fromDate && matchDate <= this.toDate;
      });

      this.array = [];
      this.appendItems(0, this.sum);
    });
  }

  clearFilter() {
    this.busy = this.gameService.getAllGamesFromBackend2().subscribe( data => {
      this.games = data;
      this.array = [];
      this.sum = 20;
      this.appendItems(0, this.sum);
      this.searchControl.setValue('');
    });
  }
}
