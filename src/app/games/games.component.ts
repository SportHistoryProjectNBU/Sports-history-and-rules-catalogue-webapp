import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../home/gameService';
import {Game} from '../entities/Game';
import {Comment} from '../entities/Comment';
import {Rating} from '../entities/Rating';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  id: string;
  private sub: any;
  game: Game;
  comment: Comment;
  commentText: string;
  rating: Rating;
  comments: Comment[] = [];
  ratings: Rating[] = [];
  isUserVoted: boolean;
  homeRating: number;
  awayRating: number;

  constructor(private route: ActivatedRoute,
              private gameService: GameService,
              ) {
    this.rating = new Rating();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.rating.matchId = this.id;
    });
    this.gameService.getGameFromBackend(this.id).then((resp) => {
      this.game = resp;
    });
    this.gameService.getAllComments(this.id).then((resp) => this.comments = resp);
    this.isUserVoted = false;
    this.homeRating = 0;
    this.awayRating = 0;
    this.gameService.getRating(this.rating).then((resp) => {
      this.ratings = resp;
      for (let i = 0; i < this.ratings.length; i++) {
        if (this.ratings[i].userId === localStorage.getItem('id')) {
          this.isUserVoted = true;
        }
        this.homeRating += this.ratings[i].homeTeam;
        this.awayRating += this.ratings[i].awayTeam;
      }
    });
  }

  addComment() {
    this.comment = new Comment();
    this.comment.comment = this.commentText;
    this.comment.matchId = this.id;
    this.comment.userName = localStorage.getItem('userName');
    this.gameService.sendComment(this.comment).then((resp) => {
      this.comments.push(resp);
    });
  }

  sendRating() {
    this.rating.userId = localStorage.getItem('id');
    this.gameService.sendRating(this.rating).then((resp) => {
      this.rating = resp;
      this.homeRating += this.rating.homeTeam;
      this.awayRating += this.rating.awayTeam;
      this.isUserVoted = true;
    });
  }

  setHome() {
    this.rating.homeTeam = 1;
    this.rating.awayTeam = 0;
  }

  setAway() {
    this.rating.homeTeam = 0;
    this.rating.awayTeam = 1;
  }
}
