import { Component, OnInit } from '@angular/core';
import { UsersService } from '../http_services/users.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-mentorship',
  templateUrl: './mentorship.component.html',
  styleUrls: ['./mentorship.component.css']
})
export class MentorshipComponent implements OnInit {
  login: any;
  constructor(private _UsersService: UsersService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }
  ngOnInit() {
  }

}
