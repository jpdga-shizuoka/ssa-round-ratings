import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseRatingsComponent } from './course-ratings/course-ratings.component';
import { AboutThisSiteComponent } from './about-this-site/about-this-site.component';
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  { path: '', redirectTo: '/past', pathMatch: 'full' },
  { path: 'upcoming', component: UpcomingEventsComponent },
  { path: 'past', component: CourseRatingsComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'about', component: AboutThisSiteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
