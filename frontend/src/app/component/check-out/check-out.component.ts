import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/model/country';
import { SpaceValidator } from 'src/app/model/space-validator';
import { State } from 'src/app/model/state';
import { CartService } from 'src/app/service/cart.service';
import { StateCountryService } from 'src/app/service/state-country.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit{
  
  checkoutParentGroup: FormGroup;
  countries: Country[] = [];
  statesFrom: State[] = [];
  statesTo: State[] = [];
  totalOrders: number;
  totalPrice: number;
  constructor(private formChildGroup: FormBuilder,
              private stateCountryService: StateCountryService,
              private cartService: CartService){

  }

  ngOnInit(): void {
    this.buildForm();
    this.getCountries();
    this.getStatesByCode('fromPerson');
    this.getCartInfo();
  }

  buildForm(){
    this.checkoutParentGroup = this.formChildGroup.group({
      data: this.formChildGroup.group({
        fullName: new FormControl('',[
          Validators.required,
          SpaceValidator.notOnlySpace,
          Validators.minLength(6)]),
        gmail: new FormControl('',[
          Validators.required,
          Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
        ]),
        phone: new FormControl('',[
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern('^[0-9]*$')
        ])
      }),
      fromPerson: this.formChildGroup.group({
        country: [''],
        state: [''],
        zipCode: ['']
      }),
      toPerson: this.formChildGroup.group({
        country: [''],
        state: [''],
        zipCode: ['']
      }),
      creditCard: this.formChildGroup.group({
        cardType: [''],
        cardNumber: [''],
        code: ['']
      })
    })
  }





  get fullName(){
    return this.checkoutParentGroup.get('data.fullName');
  }
  get email(){
    return this.checkoutParentGroup.get('data.gmail');
  }

  get phone(){
    return this.checkoutParentGroup.get('data.phone');
  }

  done(){
    if(this.checkoutParentGroup.valid){
      console.log(this.checkoutParentGroup.value);
    }else {
      this.checkoutParentGroup.markAllAsTouched();
    }
  }

  similarPerson(event: Event){
    if((event.target as HTMLInputElement).checked){
      this.statesTo = this.statesFrom;
      this.checkoutParentGroup.get('toPerson')?.setValue(this.checkoutParentGroup.get('fromPerson')?.value);
    }
    else{
      this.checkoutParentGroup.get('toPerson')?.reset();
    }
  }


  getCountries(){
    this.stateCountryService.getAllCountries().subscribe(
      data => {
        this.countries = data;
      }
    );
  }

  getStatesByCode(typeForm: string) {
    const code = this.checkoutParentGroup.get(`${typeForm}.country`)?.value;
    this.stateCountryService.getStatesByCountryCode(code).subscribe(
      data =>{
        if(typeForm === 'fromPerson') {
          this.statesFrom = data;
        } else {
          this.statesTo = data;
        }
        this.checkoutParentGroup.get(`${typeForm}.state`)?.setValue(data[0]);
      }
    );
  }

  getCartInfo(){
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    this.cartService.totalOrders.subscribe(
      data => this.totalOrders = data
    );
  }
}
