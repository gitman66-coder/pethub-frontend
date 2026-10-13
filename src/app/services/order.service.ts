import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  // POST request to send the order
  // (this is a free test api, it just sends back whatever we post)
  placeOrder(order: any): Observable<any> {
    return this.http.post('https://jsonplaceholder.typicode.com/posts', order);
  }
}
