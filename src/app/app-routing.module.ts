import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PetListComponent } from './pet-list/pet-list.component';
import { AboutComponent } from './about/about.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // same component for all 4 pet pages, only the category in data is different
  { path: 'dogs', component: PetListComponent, data: { category: 'dog' } },
  { path: 'cats', component: PetListComponent, data: { category: 'cat' } },
  { path: 'rabbits', component: PetListComponent, data: { category: 'rabbit' } },
  { path: 'reptiles', component: PetListComponent, data: { category: 'reptile' } },
  { path: 'about', component: AboutComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '**', component: NotFoundComponent }   // any other url
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
