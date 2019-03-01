import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from './http.service';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { MentorshipComponent } from './mentorship/mentorship.component';
import { ResourcesComponent } from './resources/resources.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DonateComponent } from './donate/donate.component';
import { LogInComponent } from './log-in/log-in.component';
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
    DonateComponent,
    LogInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
