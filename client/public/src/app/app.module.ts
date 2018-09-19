import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupsComponent } from './groups/groups.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { GroupComponent } from './group/group.component';
import { PokemonService } from './pokemon.service';
import { GroupService } from './group.service';
import { NewGroupComponent } from './new-group/new-group.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupsComponent,
    PokemonComponent,
    GroupComponent,
    NewGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PokemonService, GroupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
