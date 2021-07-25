import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReloadComponent } from './app-reload';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { RoundsTabsComponent } from './rounds-tabs/rounds-tabs.component';
import { EventsTabsComponent } from './events-tabs/events-tabs.component';
import { StatsTabsComponent } from './stats-tabs/stats-tabs.component';
import { AboutThisSiteComponent } from './about-this-site/about-this-site.component';

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
    path: 'events/upcoming',
    component: EventsTabsComponent,
    data: {
      metaDescription: {
        title: 'DG Japan - Disc Golf Events',
        subtitle: 'Schedule',
        description: 'Schedule of the official disc golf events held in Japan.',
        keywords: 'disc golf,official events,japan'
      }
    }
  },
  {
    path: 'events/local',
    component: EventsTabsComponent,
    data: {
      metaDescription: {
        title: 'DG Japan - Local Events',
        subtitle: 'Local Events',
        description: 'Schedule of the local events held in Japan.',
        keywords: 'disc golf,local events,japan'
      }
    }
  },
  {
    path: 'events/monthly',
    component: EventsTabsComponent,
    data: {
      metaDescription: {
        title: 'DG Japan - Monthly Events',
        subtitle: 'Monthly',
        description: 'Schedule of the local monthly events held in Japan.',
        keywords: 'disc golf,monthly events,japan'
      }
    }
  },
  {
    path: 'past',
    component: RoundsTabsComponent,
    data: {
      metaDescription: {
        title: 'DG Japan - Results',
        subtitle: 'Results',
        description: 'Results of the official disc golf events held in Japan.',
        keywords: 'disc golf,events,results,japan'
      }
    }
  },
  {
    path: 'past/video',
    component: RoundsTabsComponent,
    data: {
      metaDescription: {
        title: 'DG Japan - Video',
        subtitle: 'Results',
        description: 'Video library of the official disc golf events held in Japan.',
        keywords: 'disc golf,events,results,japan,video'
      }
    }
  },
  {
    path: 'stats',
    redirectTo: 'stats/difficulty'
  },
  {
    path: 'stats/players',
    component: StatsTabsComponent,
    data: {
      metaDescription: {
        title: 'DG Japan - Players Chart',
        subtitle: 'Players',
        description: 'A graph of the number of participating players by year',
        keywords: 'disc golf,events,stats,japan'
      }
    }
  },
  {
    path: 'stats/difficulty',
    component: StatsTabsComponent,
    data: {
      metaDescription: {
        title: 'DG Japan - Difficulty Chart',
        subtitle: 'Difficulty',
        description: 'A graph of the difficulty of course rounds',
        keywords: 'disc golf,events,stats,japan'
      }
    }
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
