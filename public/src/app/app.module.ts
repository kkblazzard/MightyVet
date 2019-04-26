import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// services
import { WebinarsService } from './http_services/webinars.service';
import { UsersService } from './http_services/users.service';
import { MeetingsService } from './http_services/meetings.service';
import { AccreditationsService } from './http_services/accreditations.service';
import { MentorsService } from './http_services/mentors.service';
import { NewslettersService } from './http_services/newsletters.service';
import { PartnersService } from './http_services/partners.service';
import { SpeakersService } from './http_services/speakers.service';
import { FileUploadService } from './http_services/file-upload.service';
import { PaymentsService } from './http_services/payments.service';
import { AuthenticationService } from './http_services/authentication.service';
import { AdminService } from './http_services/admin.service';
import { LoginService } from './http_services/login.service';
// modules
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
// Fontawesome
import { AngularFontAwesomeModule } from 'angular-font-awesome';
// components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { MentorshipComponent } from './mentorship/mentorship.component';
import { ResourcesComponent } from './resources/resources.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SupportComponent } from './support/support.component';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { HeaderComponent } from './header/header.component';
import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { AdminPartnersComponent } from './admin-partners/admin-partners.component';
import { AdminWebinarsComponent } from './admin-webinars/admin-webinars.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AvailabilityComponent } from './availability/availability.component';
import { AdminMentorsComponent } from './admin-mentors/admin-mentors.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SpeakerDetailsComponent } from './speaker-details/speaker-details.component';
import { AdminNewsletterComponent } from './admin-newsletter/admin-newsletter.component';
import { MentorDetailsComponent } from './mentor-details/mentor-details.component';
import { DonationComponent } from './donation/donation.component';

@Pipe({ name: 'keys', pure: false })

export class KeysPipe implements PipeTransform {
  transform(value: any): any {
    return Object.keys(value);
  }
}

//--------------mentor pipe-----------------------
@Pipe({ name: 'mentorsearch', pure: false })

export class MentorSearchPipe implements PipeTransform {
  transform(value: Array<any>, search: any): Array<any> {
    if (value) {
      var strings = search.bar.toLowerCase().split(' ');
      value = value.sort((x, y) => {
        var count_x = 0;
        var count_y = 0;
        for (let j = 0; j < strings.length; j++) {
          if (x.user.firstName.toLowerCase().includes(strings[j])) {
            count_x++;
          }
          if (x.user.lastName.toLowerCase().includes(strings[j])) {
            count_x++;
          }
          if (x.user.title.toLowerCase().includes(strings[j])) {
            count_x++;
          }
          if (x.user.org.toLowerCase().includes(strings[j])) {
            count_x++;
          }
          if (x.resume.toLowerCase().includes(strings[j])) {
            count_x++;
          }
          if (y.user.firstName.toLowerCase().includes(strings[j])) {
            count_y++;
          }
          if (y.user.lastName.toLowerCase().includes(strings[j])) {
            count_y++;
          }
          if (y.user.title.toLowerCase().includes(strings[j])) {
            count_y++;
          }
          if (y.user.org.toLowerCase().includes(strings[j])) {
            count_y++;
          }
          if (y.resume.toLowerCase().includes(strings[j])) {
            count_y++;
          }
        }
        if (search.mental_health) {
          if (x.support.mental_health) {
            count_x += 10;
          }
          if (y.support.mental_health) {
            count_y += 10;
          }
        }
        if (search.financial_advice) {
          if (x.support.financial_advice) {
            count_x += 10;
          }
          if (y.support.financial_advice) {
            count_y += 10;
          }
        }
        if (search.career_advice) {
          if (x.support.career_advice) {
            count_x += 10;
          }
          if (y.support.career_advice) {
            count_y += 10;
          }
        }
        if (search.technical_advice) {
          if (x.support.technical_advice) {
            count_x += 10;
          }
          if (y.support.technical_advice) {
            count_y += 10;
          }
        }
        return count_x === count_y ? 0 : count_x > count_y ? -1 : 1;
      });
      return value.slice(0, search.featuredNumber);
    }
    return [];
  }
}

//-------------end mentor pipe--------------------

//  ---------- course featured number-------
@Pipe({ name: 'search', pure: true })

export class SearchPipe implements PipeTransform {
  transform(value: Array<any>, num: number): Array<any> {
    if (value) {
      return value.slice(0, num);
    } else {
      return new Array<any>();
    }
  }
}

// -----------courses pipe-----------
@Pipe({ name: 'coursesearch', pure: false })

export class CourseSearchPipe implements PipeTransform {
  transform(value: Array<any>, search: any): Array<any> {
    if (value) {
      var strings = search.bar.toLowerCase().split(' ');
      value = value.sort((x, y) => {
        var count_x = 0;
        var count_y = 0;
        for (let j = 0; j < strings.length; j++) {
          if (x.title.toLowerCase().includes(strings[j])) {
            count_x++;
          }
          if (x.description.toLowerCase().includes(strings[j])) {
            count_x++;
          }
          if (x.speaker.firstName.toLowerCase().includes(strings[j])) {
            count_x++;
          }
          if (x.speaker.lastName.toLowerCase().includes(strings[j])) {
            count_x++;
          }
          if (y.title.toLowerCase().includes(strings[j])) {
            count_y++;
          }
          if (y.description.toLowerCase().includes(strings[j])) {
            count_y++;
          }
          if (y.speaker.firstName.toLowerCase().includes(strings[j])) {
            count_y++;
          }
          if (y.speaker.lastName.toLowerCase().includes(strings[j])) {
            count_y++;
          }
        }
        if (search.type.Live) {
          if (x.type.includes("Live")) {
            count_x += 3;
          }
          if (y.type.includes("Live")) {
            count_y += 3;
          }
        }
        if (search.type.Video) {
          if (x.type.includes("Video")) {
            count_x += 3;
          }
          if (y.type.includes("Video")) {
            count_y += 3;
          }
        }
        if (search.category.management) {
          console.log("pipe management search");
          if (x.category.management) {
            console.log("pipe management search2");
            count_x += 10;
          }
          if (y.category.management) {
            count_y += 10;
          }
        }
        if (search.category.communication) {
          console.log("pipe communication 1");
          if (x.category.communication) {
            console.log("pipe communication 2");
            count_x += 10;
          }
          if (y.category.communication) {
            console.log("pipe communication 3");
            count_y += 10;
          }
        }
        if (search.category.medical) {
          if (x.category.medical) {
            count_x += 10;
          }
          if (y.category.medical) {
            count_y += 10;
          }
        }
        if (search.category.technical) {
          if (x.category.technical) {
            count_x += 10;
          }
          if (y.category.technical) {
            count_y += 10;
          }
        }

        return count_x === count_y ? 0 : count_x > count_y ? -1 : 1;
      });
      return value.slice(0, search.featuredNumber);
    }
    return [];
  }
}

// ---------slice pipe---------------

@Pipe({ name: 'slice', pure: true })

export class SlicePipe implements PipeTransform {
  transform(value: string, num: number): string {
    if (value.length > num) {
      return value.slice(0, num) + "...";
    }
    return value;
  }
}

// ---------module declarations----------
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CoursesComponent,
    CourseDetailComponent,
    MentorshipComponent,
    ResourcesComponent,
    UserProfileComponent,
    SupportComponent,
    SchedulingComponent,
    HeaderComponent,
    BlogComponent,
    AboutComponent,
    FooterComponent,
    AdminComponent,
    AdminPartnersComponent,
    AdminWebinarsComponent,
    AdminUsersComponent,
    AvailabilityComponent,
    KeysPipe,
    SearchPipe,
    MentorSearchPipe,
    CourseSearchPipe,
    SlicePipe,
    AdminMentorsComponent,
    NotFoundComponent,
    SpeakerDetailsComponent,
    AdminNewsletterComponent,
    MentorDetailsComponent,
    DonationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgbModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers: [
    WebinarsService,
    UsersService,
    MeetingsService,
    AccreditationsService,
    MentorsService,
    NewslettersService,
    PartnersService,
    SpeakersService,
    FileUploadService,
    PaymentsService,
    NgbActiveModal,
    AuthenticationService,
    AdminService,
    LoginService
  ]
})
export class AppModule { }
