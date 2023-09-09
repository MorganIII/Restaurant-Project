import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/model/order';
import { OrderServiceService } from 'src/app/service/order-service.service';

@Component({
  selector: 'app-search-order',
  templateUrl: './search-order.component.html',
  styleUrls: ['./search-order.component.css']
})
export class SearchOrderComponent {


  constructor(private orderService:OrderServiceService, private router: Router) { }


  doSearch(value: string){
    this.router.navigate(['/orders', value]);
  }
}
