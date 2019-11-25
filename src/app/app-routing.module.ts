import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoundsTabsComponent } from './rounds-tabs/rounds-tabs.component';
import { EventsTabsComponent } from './events-tabs/events-tabs.component';
import { AboutThisSiteComponent } from './about-this-site/about-this-site.component';

const routes: Routes = [
  { path: '', redirectTo: '/events/upcoming', pathMatch: 'full' },
  { path: 'events/upcoming', component: EventsTabsComponent },
  { path: 'events/local', component: EventsTabsComponent },
  { path: 'events/monthly', component: EventsTabsComponent },
  { path: 'past', component: RoundsTabsComponent },
  { path: 'about', component: AboutThisSiteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
