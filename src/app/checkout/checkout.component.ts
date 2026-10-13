import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { City } from '../pet';
import { PetService } from '../services/pet.service';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  standalone: false,
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  cities: City[] = [];
  selectedCity: City | null = null;
  deliveryCharge = 0;

  submitted = false;
  message = '';
  errorMessage = '';

  // after the order is placed
  orderPlaced = false;
  orderId = 0;
  orderDate = new Date();
  orderName = '';
  orderTotal = 0;

  // reactive form with validations
  checkoutForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('[A-Za-z ]+')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]),
    address: new FormControl('', [Validators.required, Validators.minLength(10)]),
    city: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{6}$')]),
    payment: new FormControl('', [Validators.required]),
    terms: new FormControl(false, [Validators.requiredTrue])
  });

  constructor(
    public cartService: CartService,
    private petService: PetService,
    private orderService: OrderService
  ) { }

  // load the cities when the page opens
  ngOnInit() {
    this.petService.getCities().subscribe({
      next: (data) => {
        this.cities = data;
      },
      error: () => {
        this.errorMessage = 'Could not load the delivery cities.';
      }
    });
  }

  // when the city is changed
  onCityChange() {
    const cityName = this.checkoutForm.get('city')?.value;
    this.selectedCity = null;
    this.deliveryCharge = 0;

    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].name == cityName) {
        this.selectedCity = this.cities[i];
        this.deliveryCharge = this.cities[i].charge;
      }
    }
  }

  getGrandTotal(): number {
    return this.cartService.getTotal() + this.deliveryCharge;
  }

  // true if the field has an error and the user already touched it
  isInvalid(field: string): boolean {
    const control = this.checkoutForm.get(field);
    return !!(control && control.invalid && (control.touched || this.submitted));
  }

  // true if the field has one particular error
  hasError(field: string, error: string): boolean {
    const control = this.checkoutForm.get(field);
    return !!(control && control.hasError(error));
  }

  placeOrder() {
    this.submitted = true;
    this.message = '';

    if (this.cartService.items.length == 0) {
      this.message = 'Your cart is empty. Add a pet first.';
      return;
    }

    if (this.checkoutForm.invalid) {
      this.message = 'Please fix the errors in the form.';
      return;
    }

    const order = {
      customer: this.checkoutForm.value,
      items: this.cartService.items,
      total: this.getGrandTotal()
    };

    this.message = 'Placing your order...';

    this.orderService.placeOrder(order).subscribe({
      next: (response) => {
        this.orderId = response.id;
        this.orderDate = new Date();
        this.orderName = this.checkoutForm.get('name')?.value || '';
        this.orderTotal = this.getGrandTotal();
        this.orderPlaced = true;
        this.message = '';
        this.cartService.clearCart();
      },
      error: () => {
        this.message = 'Something went wrong, please try again.';
      }
    });
  }
}
