import { Component, OnInit } from '@angular/core';
import { Pet } from '../pet';
import { PetService } from '../services/pet.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: false,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  featuredPets: Pet[] = [];
  message = '';

  constructor(private petService: PetService, private cartService: CartService) { }

  // runs when the home page opens
  ngOnInit() {
    this.petService.getPets().subscribe(data => {
      // only the pets which have featured = true
      this.featuredPets = data.filter(p => p.featured);
    });
  }

  addToCart(pet: Pet) {
    if (this.cartService.addToCart(pet)) {
      this.message = pet.name + ' added to cart!';
    } else {
      this.message = pet.name + ' is already in your cart';
    }
  }
}
