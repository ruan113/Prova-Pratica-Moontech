import { Component } from '@angular/core';
import { Filme } from 'src/assets/filme';
import { Observable } from 'rxjs';
import { CardService } from './card.service';
import { Player } from 'src/assets/player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'provinha';

  /*
    filmes que consegui retorno: game of thrones, batman, starwars (retornou mas faltando dados de rating)
  */

  tituloEscolhido: string;

  playerAtual = 'player1';

  players: Player[] = [
    {
      nome: "player 1",
      pontuacao: 0
    },
    {
      nome: "player 2",
      pontuacao: 0
    }
  ]

  cardPlayer1: Filme = {
    Title: 'undefined',
    imdbRating: 0.0,
    imdbVotes: 0,
    Poster: 'https://st3.depositphotos.com/3367263/16473/i/1600/depositphotos_164739930-stock-photo-404-page-not-found-text.jpg'
  };
  cardPlayer2: Filme = {
    Title: 'undefined',
    imdbRating: 0.0,
    imdbVotes: 0,
    Poster: 'https://st3.depositphotos.com/3367263/16473/i/1600/depositphotos_164739930-stock-photo-404-page-not-found-text.jpg'
  };

  cartasJogadas: Filme[];

  errorStatus : string;
  hasErrors : boolean;

  playerInicial: string = 'player1';

  constructor(private service: CardService) { }

  getCard(){
    this.service.getNewCard(this.tituloEscolhido).subscribe(
      dados => (this.playerAtual === 'player1') ? this.cardPlayer1 = dados : this.cardPlayer2 = dados
    );

    (this.playerAtual === 'player1') ? this.playerAtual = 'player2' : this.playerAtual = 'player1';

    //fim do round
    if(this.playerInicial === this.playerAtual){
      if(this.cardPlayer1.imdbRating > this.cardPlayer2.imdbRating){
        this.players[0].pontuacao++;
      }else{
        if(this.cardPlayer1.imdbRating < this.cardPlayer2.imdbRating){
          this.players[1].pontuacao++;
        }else{
          if(this.cardPlayer1.imdbRating === this.cardPlayer2.imdbRating){
            if(this.cardPlayer1.imdbVotes > this.cardPlayer2.imdbVotes){
              this.players[0].pontuacao++;
            }else{
              this.players[1].pontuacao++;
            }
          }
        }
      }
    }
  }
}
