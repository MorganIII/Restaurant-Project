import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Order } from '../model/order';
@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  private baseUrl = 'http://localhost:8080/api/';
  
  constructor(private http: HttpClient) { }
  getOrders(page: number, size: number) : Observable <Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}orders?page=${page}&size=${size}`).pipe(
      map(
        response => response
      )
    );
  }


  getOrdersByCategoryId(id:number,page: number, size: number) : Observable <Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}category?id=${id}&page=${page}&size=${size}`).pipe(
      map(
        response => response
      )
    );
  }

  getOrdersByKeyword(keyword:string,page: number, size: number) : Observable <Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}search?name=${keyword}&page=${page}&size=${size}`).pipe(
      map(
        response => response
    )
    );
  }

  getOrderById(id:number) : Observable <Order> {
    return this.http.get<Order>(`${this.baseUrl}order?id=${id}`).pipe(
      map(
        response => response
      )
    );
  }

  getOrdersSize() : Observable <number> {
    return this.http.get<number>(`${this.baseUrl}ordersSize`).pipe(
      map(
        response => response
      )
    );
  }

  getOrdersSizeByCategoryId(id:number) : Observable <number> {
    return this.http.get<number>(`${this.baseUrl}categoryIdSize?id=${id}`).pipe(
      map(
        response => response
      )
    );
  }

  getOrdersSizeByKeyword(keyword:string) : Observable <number> {
    return this.http.get<number>(`${this.baseUrl}keySize?key=${keyword}`).pipe(
      map(
        response => response
      )
    );
  }
}
