import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { GroupService } from '../group.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  @Input() group;
  @Output() deleteGroupEmitter = new EventEmitter();

  private newPokemon: any;
  private allPokemon: any;
  private errors: any;

  constructor(private ps: PokemonService, private gs: GroupService, private router: Router) { this.init(); }

  init(){
    this.newPokemon = {name:"", weight:"", number:0, abilities:[]};
    this.errors = [];
  }

  ngOnInit() {
    this.getPokemonsFromService();
  }

  getPokemonsFromService(){
    this.ps.all(this.group._id).subscribe(data => {
      this.allPokemon = data;
    })
  }

  // Creates a pokemon based on what is typed into the textbox. If it is left blank, the user is prompted to
  // enter a name. If the pokemon service throws an error, then the input string must not be within the pokeapi dataset
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
        this.ps.add(this.group._id, this.newPokemon).subscribe(data => {
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

  // Added ability to delete pokemon from the homepage by clicking on the font-awesome icon, shortcut for going to the pokemon's individual page
  deletePokemon(id){
    let index = this.allPokemon.map(i => {return i._id}).indexOf(id);
    this.ps.delete(id).subscribe(data => {
      this.allPokemon.splice(index, 1);
    })
  }

  // Uses EventEmitter to send group to be deleted to parent component (GroupsComponent)
  deleteGroup(id){
    this.gs.delete(id).subscribe(data => {
      this.deleteGroupEmitter.emit(data);
    })
  }

}
