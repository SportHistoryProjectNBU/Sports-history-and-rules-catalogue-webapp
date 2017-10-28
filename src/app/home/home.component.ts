import { Component, OnInit } from '@angular/core';
import {Game} from '../entities/game';
import {GameService} from './gameService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  game: Game;

  constructor(private gameService: GameService) { }

  ngOnInit() {
     this.game = new Game();
      this.gameService.getAllGames().then((resp) => this.game = resp);
  }

}
