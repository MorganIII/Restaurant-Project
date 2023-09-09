import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CartOrder } from 'src/app/model/cart-order';
import { Order } from 'src/app/model/order';
import { CartService } from 'src/app/service/cart.service';
import { OrderServiceService } from 'src/app/service/order-service.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit{
  currentPage: number = 1;
  orders: Order[] = [];
  totalRecords: number = 0;
  pageSize: number = 10;

  constructor(private order: OrderServiceService,
              private route: ActivatedRoute,
              private cartService: CartService) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(
        () => this.decideToShow()
    );
  }

  decideToShow() { 
    let hasKeyword = this.route.snapshot.paramMap.has('key');
    let hasId = this.route.snapshot.paramMap.has('id');
    if(hasId) {
      
      this.getOrdersByCategoryId();
    } else if(hasKeyword) {
      this.getOrdersByKeyword();
    } 
    else {
      this.getOrders();
    }
  }
  getOrders() {
    this.order.getOrdersSize().subscribe(
      (data) => {
        this.totalRecords = data;
      }
    );
     return this.order.getOrders(this.currentPage-1,this.pageSize).subscribe(
        (data) => {
          this.orders = data;
        }
     ); 
  }

  getOrdersByCategoryId() { 
    let id = +this.route.snapshot.paramMap.get('id')!;
    this.order.getOrdersSizeByCategoryId(id).subscribe(
      (data) => {
        this.totalRecords = data;
      }
    );
    this.order.getOrdersByCategoryId(id,this.currentPage-1,this.pageSize).subscribe(
      (data) => {
        this.orders = data;
      }
    );
  }

  getOrdersByKeyword() {
    let keyword = this.route.snapshot.paramMap.get('key')!;
    this.order.getOrdersSizeByKeyword(keyword).subscribe(
      (data) => {
        this.totalRecords = data;
      }
    );
    this.order.getOrdersByKeyword(keyword,this.currentPage-1,this.pageSize).subscribe(
      (data) => {
        this.orders = data;
      }
    );
  }

  onPageChange() {
    this.decideToShow();
  }

  changePageSize(event: Event){
    this.pageSize = +(event.target as HTMLInputElement).value;
    this.decideToShow();
  }

  addToCart(order: Order) {
    const cartOrder = new CartOrder(order);
    this.cartService.addToCart(cartOrder);
  }

}
