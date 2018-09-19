import { Injectable } from '@angular/core';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  all(groupId){
    return this.http.get("/api/allpokemons/" + groupId);
  }
  get(id){
    return this.http.get("/api/pokemons/" + id);
  }
  add(groupId, newPokemon){
    return this.http.post("/api/pokemons/" + groupId, newPokemon);
  }
  edit(id, pokemon){
    return this.http.patch("/api/pokemons/" + id, pokemon);
  }
  delete(id){
    return this.http.delete("/api/pokemons/"+ id);
  }

  findPokemon(name){
    // changed url from pokeapi.co to pokeapi.salestock.net temporarily, reached limit for the day? Or possible CORS issue
    return this.http.get('http://pokeapi.salestock.net/api/v2/pokemon/' + name + "/").pipe(map(res => {
      if (res['status'] === 404) throw new Error('');
      else return res;
    }));
  }
}
