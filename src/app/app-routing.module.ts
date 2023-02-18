import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReloadComponent } from './app-reload';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { RoundsTabsComponent } from './rounds-tabs/rounds-tabs.component';
import { LocalTabsComponent } from './events-tabs/local-tabs.component';
import { MonthlyTabsComponent } from './events-tabs/monthly-tabs.component';
import { UpcomingTabsComponent } from './events-tabs/upcoming-tabs.component';
import { StatsTabsComponent } from './stats-tabs/stats-tabs.component';
import { IndexComponent } from './libraries/index.component';
import { AboutThisSiteComponent } from './about-this-site/about-this-site.component';
import { EventComponent } from './event/event.component';
import { ClassificationsComponent } from './libraries/classifications.component';
import { DivisionsComponent } from './libraries/divisions.component';
import { FaqRatingsComponent } from './libraries/faq-ratings.component';
import { NonStandardRulesComponent } from './libraries/non-standard-rules.component';
import { PlayerpackComponent } from './libraries/playerpack.component';
import { PointsComponent } from './libraries/points.component';
import { ReclassificationComponent } from './libraries/reclassification.component';
import { Sec5Component } from './libraries/sec5.component';
import { Sec8Component } from './libraries/sec8.component';
import { TrueAmateurComponent } from './libraries/true-amateur.component';
import { TourStandardsComponent } from './libraries/tour-standards.component';
import { RatingsComponent } from './libraries/ratings.component';

export type UserData = {
  metaDescription: {
    title?: string;
    description?: string;
    keywords?: string;
  };
}

const routes: Routes = [
  {
    path: '',
    component: DashBoardComponent,
    data: {
      metaDescription: {
        title: 'DG Japan',
        description: 'A database of disc golf events held in Japan',
        keywords: 'disc golf,events,japan,schedule,stats,results,videos'
      }
    }
  },

  {
    path: 'event/:eventId',
    component: EventComponent,
    data: {
      metaDescription: {
        title: 'DG Japan - Disc Golf Event',
        subtitle: 'Event',
        description: 'event information',
        keywords: 'disc golf,official events,japan'
      }
    }
  },

  {
    path: 'schedule', redirectTo: '/schedule/events', pathMatch: 'full'
  },
  {
    path: 'schedule/:tabname',
    component: UpcomingTabsComponent,
    data: {
      metaDescription: {
        title: 'DG Japan - Disc Golf Events',
        subtitle: 'Upcoming',
        description: 'Upcoming schedule of the official events.',
        keywords: 'disc golf,official events,japan'
      }
    }
  },

  {
    path: 'local', redirectTo: '/local/events', pathMatch: 'full'
  },
  {
    path: 'local/:tagname',
    component: LocalTabsComponent,
    data: {
      metaDescription: {
        title: 'DG Japan - Local Events',
        subtitle: 'Local Events',
        description: 'Upcoming schedule of the local events.',
        keywords: 'disc golf,local events,japan'
      }
    }
  },

  {
    path: 'monthly', redirectTo: '/monthly/events', pathMatch: 'full'
  },
  {
    path: 'monthly/:tagname',
    component: MonthlyTabsComponent,
    data: {
      metaDescription: {
        title: 'DG Japan - Monthly Events',
        subtitle: 'Monthly',
        description: 'Schedule of the local monthly events.',
        keywords: 'disc golf,monthly events,japan'
      }
    }
  },

  {
    path: 'past', redirectTo: '/past/events', pathMatch: 'full'
  },
  {
    path: 'past/:tagname',
    component: RoundsTabsComponent,
    data: {
      metaDescription: {
        title: 'DG Japan - Event Results',
        subtitle: 'Results',
        description: 'Results of the official events.',
        keywords: 'disc golf,events,results,japan,video'
      }
    }
  },

  {
    path: 'stats', redirectTo: '/stats/difficulty', pathMatch: 'full'
  },
  {
    path: 'stats/:tagname',
    component: StatsTabsComponent,
    data: {
      metaDescription: {
        title: 'DG Japan - Stats',
        subtitle: 'Stats',
        description: 'Stats of the official disc golf events held in Japan.',
        keywords: 'disc golf,events,stats,japan'
      }
    }
  },

  {
    path: 'libraries', redirectTo: '/libraries/index', pathMatch: 'full'
  },
  {
    path: 'libraries/index',
    component: IndexComponent,
    data: { metaDescription: {  title: 'DG Japan - Libraries'}}
  },
  {
    path: 'libraries/classifications',
    component: ClassificationsComponent,
    data: { metaDescription: {  title: 'DG Japan - Libraries'}}
  },
  {
    path: 'libraries/divisions',
    component: DivisionsComponent,
    data: { metaDescription: {  title: 'DG Japan - Libraries'}}
  },
  {
    path: 'libraries/faqratings',
    component: FaqRatingsComponent,
    data: { metaDescription: {  title: 'DG Japan - Libraries'}}
  },
  {
    path: 'libraries/nonstandards',
    component: NonStandardRulesComponent,
    data: { metaDescription: {  title: 'DG Japan - Libraries'}}
  },
  {
    path: 'libraries/playerpack',
    component: PlayerpackComponent,
    data: { metaDescription: {  title: 'DG Japan - Libraries'}}
  },
  {
    path: 'libraries/points',
    component: PointsComponent,
    data: { metaDescription: {  title: 'DG Japan - Libraries'}}
  },
  {
    path: 'libraries/ratings',
    component: RatingsComponent,
    data: { metaDescription: {  title: 'DG Japan - Libraries'}}
  },
  {
    path: 'libraries/reclassification',
    component: ReclassificationComponent,
    data: { metaDescription: {  title: 'DG Japan - Libraries'}}
  },
  {
    path: 'libraries/sec5',
    component: Sec5Component,
    data: { metaDescription: {  title: 'DG Japan - Libraries'}}
  },
  {
    path: 'libraries/sec8',
    component: Sec8Component,
    data: { metaDescription: {  title: 'DG Japan - Libraries'}}
  },
  {
    path: 'libraries/trueamateur',
    component: TrueAmateurComponent,
    data: { metaDescription: {  title: 'DG Japan - Libraries'}}
  },
  {
    path: 'libraries/tourstandards',
    component: TourStandardsComponent,
    data: { metaDescription: {  title: 'DG Japan - Libraries'}}
  },

  {
    path: 'about',
    component: AboutThisSiteComponent,
    data: {
      metaDescription: {
        title: 'DG Japan - About Us',
        subtitle: 'About this site',
        description: 'About Us, Privacy Policy, Terms, Open Source Software Project.',
        keywords: 'disc golf,ssa,scratch scoring averages,japan'
      }
    }
  },
  {
    path: 'reload', component: ReloadComponent
  },
  {
    path: 'reload/:currentpath', component: ReloadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
