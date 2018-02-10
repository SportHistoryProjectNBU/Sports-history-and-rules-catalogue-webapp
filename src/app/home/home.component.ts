import {Component, OnInit} from '@angular/core';
import {GameService} from './gameService';
import {FootballGames} from './FootballGames';
import {Game} from '../entities/Game';
import {Router} from '@angular/router';
import {LoginRegisterService} from "../register/login-register.service";
import {User} from "../entities/user";
import {RegisterListener} from "../listeners/registerListener";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  footballGames: FootballGames;
  games: Game[];

  constructor(private gameService: GameService,
              private router: Router) {
    this.footballGames = new FootballGames();
    this.gameService.getAllGamesFromAPI().then((resp) => {
      this.footballGames = resp;
      this.gameService.insertNewGame(this.footballGames.fixtures).then((respoz) => {
        this.gameService.getAllGamesFromBackend().then((responseBackend) => {
          this.games = responseBackend;
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
}
