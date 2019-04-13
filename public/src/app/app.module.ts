import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
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
// modules
import {HttpClientModule} from '@angular/common/http';
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
import { Pipe, PipeTransform } from '@angular/core';
import { AdminMentorsComponent } from './admin-mentors/admin-mentors.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SpeakerDetailsComponent } from './speaker-details/speaker-details.component';
import { AdminNewsletterComponent } from './admin-newsletter/admin-newsletter.component';
import { MentorDetailsComponent } from './mentor-details/mentor-details.component';

@Pipe({ name: 'keys',  pure: false })

export class KeysPipe implements PipeTransform {
    transform(value: any): any {
        return Object.keys(value);
    }
}
@Pipe({ name: 'mentorsearch', pure: true })

export class MentorSearchPipe implements PipeTransform {
    transform(value: Array<any>, search: any): Array<any> {
      if (value){
        return value.slice(0, search['featuredNumber']);
      }
      else{
        return new Array<any>();
      }
    }
}

@Pipe({ name: 'search', pure: true })

export class SearchPipe implements PipeTransform {
    transform(value: Array<any>, num: number): Array<any> {
      if (value){
        return value.slice(0, num);
      }
      else{
        return new Array<any>();
      }
    }
}

@Pipe({ name: 'slice', pure: true })

export class SlicePipe implements PipeTransform {
  transform(value: string, num: number): string {
    if (value.length > num){
      return value.slice(0, num)+"...";
    }
    return value;
  }
}
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
    SlicePipe,
    AdminMentorsComponent,
    NotFoundComponent,
    SpeakerDetailsComponent,
    AdminNewsletterComponent,
    MentorDetailsComponent,
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
    FileUploadService
  ]
})
export class AppModule { }
