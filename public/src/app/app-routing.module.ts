import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { MentorshipComponent } from './mentorship/mentorship.component';
import { ResourcesComponent } from './resources/resources.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SupportComponent } from './support/support.component';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { AdminWebinarsComponent } from './admin-webinars/admin-webinars.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminPartnersComponent } from './admin-partners/admin-partners.component';
const routes: Routes = [
  {path: "", pathMatch: 'full', component: HomeComponent},
  {path: 'user', component: UserProfileComponent},
  {path: 'signup', component: SignUpComponent}, //do not change (to redirect to user) until login creation complete
  {path: 'login', component: LoginComponent}, //do not change (to redirect to user) until login creation complete
  {path: 'courses', component: CoursesComponent},
  {path: 'courses/details', component: CourseDetailComponent},
  {path: 'mentorship', component: MentorshipComponent},
  {path: 'mentorship/schedule', component: SchedulingComponent},
  {path: 'resources', component: ResourcesComponent},
  {path: 'support', component: SupportComponent},
  {path: "blog", component: BlogComponent},
  {path: "about", component: AboutComponent},
  {path: "admin", component: AdminComponent, children:[
    {path: "webinars", component: AdminWebinarsComponent},
    {path: "users", component: AdminUsersComponent},
    {path: "partners", component: AdminPartnersComponent}
  ]},
  {path:'**', redirectTo:'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
