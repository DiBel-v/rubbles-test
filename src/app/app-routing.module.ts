import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';


const routes: Routes = [
  {path: '', redirectTo: 'slider', pathMatch: 'full'},
  {path: 'slider', component: SliderComponent},
  {path: '**', redirectTo: 'slider'}
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
