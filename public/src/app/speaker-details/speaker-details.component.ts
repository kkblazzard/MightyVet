import { Input, Component, OnInit } from '@angular/core';

@Component({

  selector: 'app-speaker-details',
  templateUrl: './speaker-details.component.html',
  styleUrls: ['./speaker-details.component.css']
})
export class SpeakerDetailsComponent implements OnInit {
  @Input() model: any;
  constructor() { }

  ngOnInit() {
  }
}
