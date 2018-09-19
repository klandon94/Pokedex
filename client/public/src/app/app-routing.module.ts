import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { EditPokemonComponent } from './edit-pokemon/edit-pokemon.component';

const routes: Routes = [
  {path:"", pathMatch:"full", redirectTo:"/groups"},
  {path:"groups", component:GroupsComponent},
  {path:"pokemon/:id", component:PokemonComponent},
  {path:"pokemon/:id/edit", component:EditPokemonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
