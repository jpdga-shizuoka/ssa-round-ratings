import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PastRoundsComponent } from './past-rounds/past-rounds.component';
import { AboutThisSiteComponent } from './about-this-site/about-this-site.component';
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  { path: '', redirectTo: '/upcoming', pathMatch: 'full' },
  { path: 'upcoming', component: UpcomingEventsComponent },
  { path: 'past', component: PastRoundsComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'about', component: AboutThisSiteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
