import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WebinarsService } from './http_services/webinars.service';
import { UsersService } from './http_services/users.service';
import { MeetingsService } from './http_services/meetings.service';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [WebinarsService,UsersService,MeetingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
