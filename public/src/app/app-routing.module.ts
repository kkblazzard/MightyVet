import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { MentorshipComponent } from './mentorship/mentorship.component';
import { MentorDetailsComponent } from './mentor-details/mentor-details.component';
import { ResourcesComponent } from './resources/resources.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SupportComponent } from './support/support.component';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { AdminWebinarsComponent } from './admin-webinars/admin-webinars.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminPartnersComponent } from './admin-partners/admin-partners.component';
import { AdminMentorsComponent } from './admin-mentors/admin-mentors.component';
import { AvailabilityComponent } from './availability/availability.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminNewsletterComponent } from './admin-newsletter/admin-newsletter.component';
import { AdminService } from './http_services/admin.service';
import { LoginService } from './http_services/login.service';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: 'user', canActivate: [LoginService], component: UserProfileComponent},
  {path: 'user/avails', canActivate: [LoginService], component: AvailabilityComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'courses/:id', component: CourseDetailComponent},
  {path: 'mentorship', component: MentorshipComponent},
  {path: 'mentorship/:id', component: MentorDetailsComponent},
  {path: 'mentorship/:id/schedule', component: SchedulingComponent},
  {path: 'resources', component: ResourcesComponent},
  {path: 'support', component: SupportComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'about', component: AboutComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AdminService], children: [
    {path: 'webinars', component: AdminWebinarsComponent},
    {path: 'users', component: AdminUsersComponent},
    {path: 'partners', component: AdminPartnersComponent},
    {path: 'mentors', component: AdminMentorsComponent},
    {path: 'newsletters', component: AdminNewsletterComponent}
  ]},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot( routes, {
    scrollPositionRestoration: 'enabled'
  })], // scrollpositionrestoration scrolls us back to the top everytime a route is activated
  exports: [RouterModule]
})
export class AppRoutingModule { }
