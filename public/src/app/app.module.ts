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
import { CurrencyMaskModule } from "ng2-currency-mask";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ImageCropperModule } from 'ngx-image-cropper';
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
import { AdminNewsletterComponent } from './admin-newsletter/admin-newsletter.component';
import { MentorDetailsComponent } from './mentor-details/mentor-details.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';
// import { DonationComponent } from './donation/donation.component';

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
      value = value.filter((x) => {
        if (search.business) {
          if (!x.support.business) {
            return false;
          }
        }
        if (search.communication) {
          if (!x.support.communication) {
            return false;
          }
        }
        if (search.mental_health) {
          if (!x.support.mental_health) {
            return false;
          }
        }
        if (search.well_being) {
          if (!x.support.well_being) {
            return false;
          }
        }
        if (search.university_life) {
          if (!x.support.university_life) {
            return false;
          }
        }
        if (search.career_path) {
          if (!x.support.career_path) {
            return false;
          }
        }
        var word_count = 0;
        var strings = search.bar.toLowerCase().split(' ');
        for (let j = 0; j < strings.length; j++) {
          if (x.user.firstName.toLowerCase().includes(strings[j])) {
            word_count++;
          }
          else if (x.user.lastName.toLowerCase().includes(strings[j])) {
            word_count++;
          }
          else if (x.user.title.toLowerCase().includes(strings[j])) {
            word_count++;
          }
          else if (x.user.org.toLowerCase().includes(strings[j])) {
            word_count++;
          }
          else if (x.resume.toLowerCase().includes(strings[j])) {
            word_count++;
          }
        }
        if(word_count !== strings.length){
          return false;
        }
        return true;
      });
      return value.slice(0, search.featuredNumber);
    }
    return [];
  }
}

//-------------end mentor pipe--------------------


// -----------courses pipe-----------
@Pipe({ name: 'coursesearch', pure: false })
export class CourseSearchPipe implements PipeTransform {
  transform(value: Array<any>, search: any): Array<any> {
    if (value) {
      value = value.filter((x) => {
        if (search.type.Live) {
          if (x.type !== "Live") {
            return false;
          }
        }
        if (search.type.Video) {
          if (x.type !== "Video") {
            return false;
          }
        }
        if (search.category.business) {
          if (!x.category.business) {
            return false;
          }
        }
        if (search.category.communication) {
          if (!x.category.communication) {
            return false;
          }
        }
        if (search.category.mental_health) {
          if (!x.category.mental_health) {
            return false;
          }
        }
        if (search.category.well_being) {
          if (!x.category.well_being) {
            return false;
          }
        }
        if (search.category.university_life) {
          if (!x.category.university_life) {
            return false;
          }
        }
        if (search.category.career_path) {
          if (!x.category.career_path) {
            return false;
          }
        }
        var word_count = 0;
        var strings = search.bar.toLowerCase().split(' ');
        for (let j = 0; j < strings.length; j++) {
          if (x.title.toLowerCase().includes(strings[j])) {
            word_count++;
          }
          else if (x.description.toLowerCase().includes(strings[j])) {
            word_count++;
          }
          else if (x.speaker.firstName.toLowerCase().includes(strings[j])) {
            word_count++;
          }
          else if (x.speaker.lastName.toLowerCase().includes(strings[j])) {
            word_count++;
          }
        }
        if(word_count !== strings.length){
          return false;
        }
        return true;
      });
      return value.slice(0, search.featuredNumber);
    }
    return [];
  }
}

// ---------slice pipe---------------
@Pipe({name: 'sortSchedule', pure: true})
export class SortSchedulePipe implements PipeTransform{
  transform(value: Array<any>): Array<any>{
    if (value.length > 1) {
      return value.sort((a,b) => 
      {
        return <any>new Date(a.datetime) - <any>new Date(b.datetime);
      });
    }
    return value;
  }
}
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
    MentorSearchPipe,
    CourseSearchPipe,
    SlicePipe,
    SortSchedulePipe,
    AdminMentorsComponent,
    NotFoundComponent,
    AdminNewsletterComponent,
    MentorDetailsComponent,
    UnsubscribeComponent,
    // DonationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CurrencyMaskModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    ImageCropperModule,
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
