import {Component, OnInit} from '@angular/core';
import {GameService} from './gameService';
import {FootballGames} from './FootballGames';
import {Fixture} from './fixture';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  footballGames: FootballGames;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.footballGames = new FootballGames();
    this.gameService.getAllGames().then((resp) => this.footballGames = resp);
  }

  footballStatus(footballgame: Fixture) {
    if (footballgame.status === 'TIMED') {
      return 1;
    } else if (footballgame.status === 'POSTPONED') {
      return 2;
    } else {
      return 3;
    }
  }
}
