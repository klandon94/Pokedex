import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { NewGroupComponent } from './new-group/new-group.component';

const routes: Routes = [
  {path:"", pathMatch:"full", redirectTo:"/groups"},
  {path:"groups", component:GroupsComponent},
  {path:"newgroup", component:NewGroupComponent},
  {path:"pokemon/:id", component:PokemonComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
