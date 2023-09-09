import { Injectable } from '@angular/core';
import { CartOrder } from '../model/cart-order';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  orders: CartOrder[] = [];

  totalOrders = new BehaviorSubject<number>(0);
  totalPrice = new BehaviorSubject<number>(0);
  constructor() { }


  addToCart(order: CartOrder) {
    let tempOrder = this.orders.find(o => o.id == order.id);
    if(tempOrder) {
      tempOrder.quantity++;
    } else {
      this.orders.push(order);
    }
    this.calculateTotalPrice();
    this.calculateTotalOrders();
  }

  calculateTotalPrice() {
    let totalPriceValue:number = 0;
    this.orders.forEach(o => {
      totalPriceValue += (o.quantity * o.price);
    });
    this.totalPrice.next(totalPriceValue);
  }

  
  calculateTotalOrders() {
    let totalOrdersValue:number = 0;
    this.orders.forEach(o => {
      totalOrdersValue += o.quantity;
    });
    this.totalOrders.next(totalOrdersValue);
  }

  removeFromCart(order: CartOrder) {
    let tempOrder = this.orders.find(o => o.id == order.id);
    if(tempOrder) {
      tempOrder.quantity--;
      if(tempOrder.quantity == 0) {
        this.orders.splice(this.orders.indexOf(tempOrder), 1);
      }
    }
    this.calculateTotalPrice();
    this.calculateTotalOrders();
  }
}
