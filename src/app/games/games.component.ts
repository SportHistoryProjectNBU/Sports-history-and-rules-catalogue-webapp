import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../home/gameService';
import {Game} from '../entities/Game';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  id: string;
  private sub: any;
  game: Game;

  constructor(private route: ActivatedRoute,
              private gameService: GameService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.gameService.getGameFromBackend(this.id).then((resp) => {this.game = resp;
    });
  }

}
