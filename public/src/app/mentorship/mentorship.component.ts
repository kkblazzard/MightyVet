import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-mentorship',
  templateUrl: './mentorship.component.html',
  styleUrls: ['./mentorship.component.css']
})
export class MentorshipComponent implements OnInit {
  login: any;
  constructor(private _httpService : HttpService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }
  ngOnInit() {
  }

}
