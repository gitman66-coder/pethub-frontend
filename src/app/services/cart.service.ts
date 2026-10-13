import { Injectable } from '@angular/core';
import { Pet } from '../pet';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: Pet[] = [];

  constructor() {
    // get the old cart back if the page was refreshed
    const saved = localStorage.getItem('pethubCart');
    if (saved) {
      this.items = JSON.parse(saved);
    }
  }

  addToCart(pet: Pet): boolean {
    // dont add the same pet two times
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id == pet.id) {
        return false;
      }
    }
    this.items.push(pet);
    this.save();
    return true;
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
    this.save();
  }

  getTotal(): number {
    let total = 0;
    for (let i = 0; i < this.items.length; i++) {
      total = total + this.items[i].price;
    }
    return total;
  }

  clearCart() {
    this.items = [];
    this.save();
  }

  save() {
    localStorage.setItem('pethubCart', JSON.stringify(this.items));
  }
}
