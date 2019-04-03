import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//services
import { WebinarsService } from './http_services/webinars.service';
import { UsersService } from './http_services/users.service';
import { MeetingsService } from './http_services/meetings.service';
import { AccreditationsService } from './http_services/accreditations.service';
import { MentorsService } from './http_services/mentors.service';
import { NewslettersService } from './http_services/newsletters.service';
import { PartnersService } from './http_services/partners.service';
import { SpeakersService } from './http_services/speakers.service';
//modules
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
//Fontawesome
import { AngularFontAwesomeModule } from 'angular-font-awesome';
//components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { MentorshipComponent } from './mentorship/mentorship.component';
import { ResourcesComponent } from './resources/resources.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SupportComponent } from './support/support.component';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { HeaderComponent } from './header/header.component';
import { BlogComponent } from './blog/blog.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { AdminPartnersComponent } from './admin-partners/admin-partners.component';
import { AdminWebinarsComponent } from './admin-webinars/admin-webinars.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AvailabilityComponent } from './availability/availability.component';
import { Pipe, PipeTransform } from '@angular/core';
import { AdminMentorsComponent } from './admin-mentors/admin-mentors.component';
import { NotFoundComponent } from './not-found/not-found.component'

@Pipe({ name: 'keys',  pure: false })

export class KeysPipe implements PipeTransform {
    transform(value: any): any {
        return Object.keys(value) 
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
    SignUpComponent,
    UserProfileComponent,
    SupportComponent,
    SchedulingComponent,
    HeaderComponent,
    BlogComponent,
    LoginComponent,
    AboutComponent,
    FooterComponent,
    AdminComponent,
    AdminPartnersComponent,
    AdminWebinarsComponent,
    AdminUsersComponent,
    AvailabilityComponent,
    KeysPipe,
    AdminMentorsComponent,
    NotFoundComponent
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
    })
  ],
  providers: [WebinarsService,UsersService,MeetingsService,AccreditationsService,MentorsService,NewslettersService,PartnersService,SpeakersService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
