import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SupportComponent } from '../support/support.component';
import { AuthenticationService } from '../http_services/authentication.service';
import { PaymentsService } from '../http_services/payments.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})

export class DonationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cardInfo') cardInfo: ElementRef;
  success = false;
  payment = true;
  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;
  amount: number;
  extraData = {
    email: '',
    // billing info
    name: '',
    address_city: '',
    address_line1: '',
    address_line2: '',
    address_state: '',
    address_zip: '',
    amount: (this.amount * 100),
  };
  constructor(
    public activeModal: NgbActiveModal,
    private cd: ChangeDetectorRef,
    private _support: SupportComponent,
    private _authenticationsService: AuthenticationService,
    private _paymentsService: PaymentsService) { }

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
    const { token, error } = await stripe.createToken(this.card, this.extraData);

    if (error) {
      console.log('Something is wrong:', error);
    } else {
      console.log('Success!', token);
      // ...send the token to the your backend to process the charge

      this._paymentsService.makePayment(token, this.extraData);

      this._support.modal.close();
      this._support.open('paymentSuccess');
    }
  }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo(){
    if (this._authenticationsService.isLoggedIn()){
      this.extraData.email = this._authenticationsService.getUserDetails().email;
      this.extraData.name = `${this._authenticationsService.getUserDetails().firstName} ${this._authenticationsService.getUserDetails().lastName}`;
      this.extraData.address_state = this._authenticationsService.getUserDetails().state;
    }
  }
  close(){
    this._support.modal.close();
  }
}
