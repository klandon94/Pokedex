import { Component, OnInit, Input} from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  @Input() group;

  private newPokemon: any;
  allPokemon: any;
  private errors: any;

  constructor(private ps: PokemonService) { this.init(); }

  init(){
    this.newPokemon = {name:"", weight:"", number:0, abilities:[]};
    this.errors = [];
  }

  ngOnInit() {
    this.getPokemonsFromService();
  }

  getPokemonsFromService(){
    this.ps.allPokemons(this.group._id).subscribe(data => {
      this.allPokemon = data;
    })
  }

  createPokemon(str){
    if (!str) {
      this.errors = [];
      this.errors.push("Please enter a name");
      return;
    }
    str = str.toLowerCase();
    this.ps.findPokemon(str).subscribe(
      data => {
        this.newPokemon.name = data['name'];
        this.newPokemon.weight = data['weight'];
        this.newPokemon.number = data['id'];
        for (let i = 0; i < data['abilities'].length; i++) this.newPokemon.abilities.push(data['abilities'][i].ability.name);
        this.ps.addPokemon(this.group._id, this.newPokemon).subscribe(data => {
          if (data['message'] || data['errors']){
            this.errors = [];
            this.errors.push(data['message']);
            return;
          }
          else {
            this.allPokemon.push(data);
            this.init();
          }
        })
      },
      error => {
        this.errors = [];
        this.errors.push("Name not valid");
      }
    )
  }

}
