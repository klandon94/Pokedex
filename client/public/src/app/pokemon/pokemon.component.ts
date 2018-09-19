import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  private pokeid: any;
  private edit: any;
  private errors: any;
  private pokemon: any;
  private editPoke: any;
  private numabilities: any;

  constructor(private ps: PokemonService, private route: ActivatedRoute, private router: Router) {this.init();}

  ngOnInit() {
  }

  init(){
    this.pokeid = this.route.params['_value']['id'];
    this.getPokemonFromService();
    this.edit = false;
    this.errors = [];
  }

  getPokemonFromService(){
    this.ps.get(this.pokeid).subscribe(data => {
      this.pokemon = data;
      this.editPoke = {name: this.pokemon.name, weight: this.pokemon.weight, abilities: this.pokemon.abilities};
      this.numabilities = this.pokemon.abilities.length;
    })
  }

  editOn(){
    this.edit = true;
  }

  updatePokemon(id){
    if (this.editPoke.abilities.length !== this.numabilities){
      this.editPoke.abilities = this.editPoke.abilities.split(",")
      if (this.editPoke.abilities[1] === "") this.editPoke.abilities.pop();
    }
    this.ps.edit(id, this.editPoke).subscribe(data => {
      if (data['error'] || data['message']){
        this.errors = [];
        this.errors.push(data['message']);
        return;
      }
      else this.init();
    })
  }

  deletePokemon(id){
    this.ps.delete(id).subscribe(data => {
      // console.log(data);
      this.router.navigateByUrl("/");
    })
  }

}
