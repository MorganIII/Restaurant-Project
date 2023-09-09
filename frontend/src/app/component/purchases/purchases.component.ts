import { Component, OnInit } from '@angular/core';
import { CartOrder } from 'src/app/model/cart-order';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  orders: CartOrder[] = [];
  totalOrders: number = 0;
  totalPrice: number = 0;
  constructor(private cartService: CartService) { }
  ngOnInit(): void {
    this.getOrders();
    this.getCartStatus();
    this.cartService.calculateTotalOrders();
    this.cartService.calculateTotalPrice();
  }


  getCartStatus() {
    this.cartService.totalOrders.subscribe(
      (data) => {
        this.totalOrders = data;
      }
    );
    this.cartService.totalPrice.subscribe(
      (data) => {
        this.totalPrice = data;
      }
    );
  }


  getOrders(): void {
    this.orders = this.cartService.orders;
  }

  incrementOrderQuantity(order: CartOrder){
    this.cartService.addToCart(order);
  }
  decrementOrderQuantity(order : CartOrder) {
    this.cartService.removeFromCart(order);
  }

  onRemoveOrder(order : CartOrder){
    order.quantity = 1;
    this.cartService.removeFromCart(order);
  }
}

