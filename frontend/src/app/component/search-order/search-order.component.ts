import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/model/order';
import { CartService } from 'src/app/service/cart.service';
import { OrderServiceService } from 'src/app/service/order-service.service';
import { AuthenticationService } from 'src/app/service/security/authentication.service';

@Component({
  selector: 'app-search-order',
  templateUrl: './search-order.component.html',
  styleUrls: ['./search-order.component.css']
})
export class SearchOrderComponent {


  constructor(private orderService:OrderServiceService, 
              private router: Router,
              private auth: AuthenticationService,
              private cartService: CartService) { }


  doSearch(value: string){
    this.router.navigate(['/orders', value]);
  }

  isAuthenticated() {
    return this.auth.isLogin();
  }
  logOut(){
    this.cartService.orders = [];
    this.cartService.totalOrders.next(0);
    this.cartService.totalPrice.next(0);
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
