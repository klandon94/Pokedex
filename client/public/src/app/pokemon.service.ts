import { Injectable } from '@angular/core';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private listeners = [];

  constructor(private http: HttpClient) { }

  attach(component){
    this.listeners.push(component);
  }
  notify(){
    for (let listener of this.listeners) listener.update();
  }

  allPokemons(groupId){
    return this.http.get("/api/pokemons/" + groupId);
  }
  getPokemon(id){
    return this.http.get("/api/pokemons/" + id);
  }
  addPokemon(groupId, newPokemon){
    return this.http.post("/api/pokemons/" + groupId, newPokemon);
  }
  editPokemon(id, pokemon){
    return this.http.patch("/api/pokemons/" + id, pokemon);
  }
  deletePokemon(id){
    return this.http.delete("/api/pokemons/"+ id);
  }

  findPokemon(name){
    return this.http.get('https://pokeapi.co/api/v2/pokemon/' + name).pipe(map(res => {
      if (res['status'] === 404) throw new Error('');
      else return res;
    }));
  }
}
