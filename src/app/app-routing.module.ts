import { CharacterDetailsComponent } from './pages/character-details/character-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing/landing.component';

const routes: Routes = [
  {path: "", component: LandingComponent},
  { path: 'character/:id', component: CharacterDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
