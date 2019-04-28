import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  @ViewChild('donate') donate: ElementRef
  @ViewChild('paymentSuccess') paymentSuccess: ElementRef
  modal: any;
  extraData: any = {

  };
  constructor(private _modalService: NgbModal) { }

  ngOnInit() {
  }
  open(content) {
    if (content === 'paymentSuccess') {
    // payment modal
    this.modal = this._modalService.open(this.paymentSuccess);
  } else {
    // donation modal
    this.modal = this._modalService.open(this.donate, { size: 'lg' });
    }
    this.modal.result.then(() => { }, () => this.closedModal());
  }
  closedModal(){
    this.modal = null;
  }
}
