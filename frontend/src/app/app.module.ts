import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import{ NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { OrderItemsComponent } from './component/order-items/order-items.component';
import { CategoryItemsComponent } from './component/category-items/category-items.component';
import { DropdownMenuComponent } from './component/dropdown-menu/dropdown-menu.component';
import { SearchOrderComponent } from './component/search-order/search-order.component';
import { OrderDetailsComponent } from './component/order-details/order-details.component';
import { CardStatusComponent } from './component/card-status/card-status.component';
import { PurchasesComponent } from './component/purchases/purchases.component';
import { CheckOutComponent } from './component/check-out/check-out.component';


const routes: Routes = [
  { path: 'check-out', component: CheckOutComponent},
  { path: 'category/:id', component: OrderItemsComponent},
  { path: 'category', component: OrderItemsComponent },
  { path: 'orders/:key', component: OrderItemsComponent},
  { path: 'order/:id', component: OrderDetailsComponent},
  { path: 'orders', component: OrderItemsComponent },
  { path: 'purchases', component: PurchasesComponent},
  { path: '', redirectTo: '/orders', pathMatch: 'full' },
  { path: '**', redirectTo: '/orders', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    OrderItemsComponent,
    CategoryItemsComponent,
    DropdownMenuComponent,
    SearchOrderComponent,
    OrderDetailsComponent,
    CardStatusComponent,
    PurchasesComponent,
    CheckOutComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
