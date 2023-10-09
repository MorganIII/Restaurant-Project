import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { HttpIntercepterBaseAuthService } from './service/security/http-intercepter-base-auth.service';
import { RouteActiveService } from './service/activated/route-active.service';
import { LoginActiveService } from './service/activated/login-active.service';
import { CookieService } from 'ngx-cookie-service';
import { CodeActivationComponent } from './component/code-activation/code-activation.component';
import { ActivationService } from './service/activated/activation.service';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';


const routes: Routes = [
  { path: 'reset', component: ResetPasswordComponent, canActivate: [LoginActiveService]},
  { path: 'activate', component: CodeActivationComponent, canActivate: [LoginActiveService, ActivationService]},
  { path: 'login', component: LoginComponent, canActivate: [LoginActiveService]},
  { path: 'signup', component: SignupComponent, canActivate: [LoginActiveService]},
  { path: 'check-out', component: CheckOutComponent, canActivate: [RouteActiveService]},
  { path: 'category/:id', component: OrderItemsComponent, canActivate: [RouteActiveService] },
  { path: 'category', component: OrderItemsComponent, canActivate: [RouteActiveService] },
  { path: 'orders/:key', component: OrderItemsComponent, canActivate: [RouteActiveService]},
  { path: 'order/:id', component: OrderDetailsComponent, canActivate: [RouteActiveService]},
  { path: 'orders', component: OrderItemsComponent, canActivate: [RouteActiveService] },
  { path: 'purchases', component: PurchasesComponent, canActivate: [RouteActiveService]},
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
    CheckOutComponent,
    LoginComponent,
    SignupComponent,
    CodeActivationComponent,
    ResetPasswordComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterBaseAuthService, multi: true},
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
