import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet, City } from '../pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  // HttpClient is given to us by dependency injection
  constructor(private http: HttpClient) { }

  // GET request for all the pets
  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>('pets.json');
  }

  // GET request for the delivery cities
  getCities(): Observable<City[]> {
    return this.http.get<City[]>('cities.json');
  }
}
