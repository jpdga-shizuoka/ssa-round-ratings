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
import { Ts2023Component } from './libraries/ts2023.component';
import { Ts2024Component } from './libraries/ts2024.component';
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
    data: { metaDescription: {
      title: 'DG Japan - 資料室',
      subtitle: '資料室'
    }}
  },
  {
    path: 'libraries/classifications',
    component: ClassificationsComponent,
    data: { metaDescription: {
      title: 'DG Japan - 選手の分類と部門',
      subtitle: '選手の分類と部門'
    }}
  },
  {
    path: 'libraries/divisions',
    component: DivisionsComponent,
    data: { metaDescription: {
      title: 'DG Japan - 部門、レーティング、ポイント',
      subtitle: '部門、レーティング、ポイント'
    }}
  },
  {
    path: 'libraries/faqratings',
    component: FaqRatingsComponent,
    data: { metaDescription: {
      title: 'DG Japan - FAQ:レーティング編',
      subtitle: 'FAQ:レーティング編'
    }}
  },
  {
    path: 'libraries/nonstandards',
    component: NonStandardRulesComponent,
    data: { metaDescription: {
      title: 'DG Japan - 非標準規則の採用に関して',
      subtitle: '非標準規則の採用に関して'
    }}
  },
  {
    path: 'libraries/playerpack',
    component: PlayerpackComponent,
    data: { metaDescription: {
      title: 'DG Japan - 賞品の価値に見合う品目',
      subtitle: '賞品の価値に見合う品目'
    }}
  },
  {
    path: 'libraries/points',
    component: PointsComponent,
    data: { metaDescription: {
      title: 'DG Japan - ポイントの仕組み',
      subtitle: 'ポイントの仕組み'
    }}
  },
  {
    path: 'libraries/ratings',
    component: RatingsComponent,
    data: { metaDescription: {
      title: 'DG Japan - レーティングの仕組み',
      subtitle: 'レーティングの仕組み'
    }}
  },
  {
    path: 'libraries/reclassification',
    component: ReclassificationComponent,
    data: { metaDescription: {
      title: 'DG Japan - プロからアマへの再登録',
      subtitle: 'プロからアマへの再登録'
    }}
  },
  {
    path: 'libraries/sec5',
    component: Sec5Component,
    data: { metaDescription: {
      title: 'DG Japan - 各国への競技マニュアルの適用',
      subtitle: '各国への競技マニュアルの適用'
    }}
  },
  {
    path: 'libraries/ts', redirectTo: 'libraries/ts2024', pathMatch: 'full'
  },
  {
    path: 'libraries/ts2024',
    component: Ts2024Component,
    data: { metaDescription: {
      title: 'DG Japan - 国際大会の基準(2024)',
      subtitle: '国際大会の基準(2024)'
    }}
  },
  {
    path: 'libraries/ts2023',
    component: Ts2023Component,
    data: { metaDescription: {
      title: 'DG Japan - 国際大会の基準(2023)',
      subtitle: '国際大会の基準(2023)'
    }}
  },
  {
    path: 'libraries/trueamateur',
    component: TrueAmateurComponent,
    data: { metaDescription: {
      title: 'DG Japan - 真のアマチュア大会',
      subtitle: '真のアマチュア大会'
    }}
  },
  {
    path: 'libraries/tourstandards',
    component: TourStandardsComponent,
    data: { metaDescription: {
      title: 'DG Japan - ツアー基準',
      subtitle: 'ツアー基準'
    }}
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
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
