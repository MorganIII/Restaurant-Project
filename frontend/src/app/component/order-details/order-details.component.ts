import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartOrder } from 'src/app/model/cart-order';
import { Order } from 'src/app/model/order';
import { CartService } from 'src/app/service/cart.service';
import { OrderServiceService } from 'src/app/service/order-service.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{

  order: Order;
  constructor(private orderService: OrderServiceService,
              private route: ActivatedRoute,
              private cartService: CartService) { }
  ngOnInit(): void {
    this.getOrderById();
  }

  getOrderById() {
    let id = +this.route.snapshot.paramMap.get('id')!;
    this.orderService.getOrderById(id).subscribe(
      (data) => {
        this.order = data;
      }
    );
  }
  
  addToCart(order: Order) {
    let cartOrder = new CartOrder(order);
    this.cartService.addToCart(cartOrder);
  }
}
