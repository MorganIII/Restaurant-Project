import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PurchaseRequest } from '../model/purchase-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  
  private baseUrl = 'http://localhost:8080/api/buy/';
  
  constructor(private http: HttpClient) { }


  sendPurchaseRequest(requestOrder: PurchaseRequest) : Observable<any> {
    return this.http.post<PurchaseRequest>(`${this.baseUrl}` + `purchase`, requestOrder).pipe(

    );
}

}