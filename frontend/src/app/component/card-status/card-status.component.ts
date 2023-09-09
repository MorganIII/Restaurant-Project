import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-card-status',
  templateUrl: './card-status.component.html',
  styleUrls: ['./card-status.component.css']
})
export class CardStatusComponent implements OnInit {

  totalOrders: number = 0;
  totalPrice: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartStatus();
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
}
