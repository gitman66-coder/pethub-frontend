import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pet } from '../pet';
import { PetService } from '../services/pet.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  standalone: false,
  styleUrl: './pet-list.component.css'
})
export class PetListComponent implements OnInit {

  category = '';
  pets: Pet[] = [];
  searchText = '';      // connected to the search box with [(ngModel)]
  message = '';
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    // get the category from the route (dog / cat / rabbit / reptile)
    this.category = this.route.snapshot.data['category'];

    this.petService.getPets().subscribe({
      next: (data) => {
        this.pets = data.filter(p => p.category == this.category);
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Could not load the pets. Please try again.';
        this.loading = false;
      }
    });
  }

  // pets which match what is typed in the search box
  getFilteredPets(): Pet[] {
    const text = this.searchText.toLowerCase();
    return this.pets.filter(p => p.name.toLowerCase().includes(text));
  }

  addToCart(pet: Pet) {
    if (this.cartService.addToCart(pet)) {
      this.message = pet.name + ' added to cart!';
    } else {
      this.message = pet.name + ' is already in your cart';
    }
  }
}
