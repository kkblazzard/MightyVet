import { 
  Component, 
  OnInit, 
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cardInfo') cardInfo: ElementRef;
  success:boolean = false;
  payment:boolean = true;
  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;
  amount:number;
  extraData={
    "email":"",
    //billing info
    "name": "",
    "address_city": "",
    "address_line1": "",
    "address_line2": "",
    "address_state": "",
    "address_zip": "",
    //company references for charge
    "data-name":"MightyVet",
    "data-description":"Donation",
    "data-amount":(this.amount *100),
    "data-locale":"auto",
    "data-zip-code":true,
    "data-billing-address":true,
    "data-cvc":true,
    "data-currency":"USD",
    

  }
  constructor(private cd: ChangeDetectorRef, private _header: HeaderComponent) { }
  
  ngAfterViewInit() {
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {
    console.log(this.card);
    const { token, error } = await stripe.createToken(this.card,this.extraData);

    if (error) {
      console.log('Something is wrong:', error);
    } else {
      console.log('Success!', token);
      // ...send the token to the your backend to process the charge
      this._header.modal.close()
      this._header.open("paymentSuccess");
    }
  }
  ngOnInit() {

  }

}
