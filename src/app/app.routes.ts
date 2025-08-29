import { Routes } from '@angular/router';
import { ReloadComponent } from './app-reload';
import { DashBoardComponent } from './dash-board/dash-board.component';

export const routes: Routes = [
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
    loadComponent: () => import('./event/event.component').then(m => m.EventComponent),
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
    loadComponent: () => import('./events-tabs/upcoming-tabs.component').then(m => m.UpcomingTabsComponent),
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
    loadComponent: () => import('./events-tabs/local-tabs.component').then(m => m.LocalTabsComponent),
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
    loadComponent: () => import('./events-tabs/monthly-tabs.component').then(m => m.MonthlyTabsComponent),
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
    loadComponent: () => import('./rounds-tabs/rounds-tabs.component').then(m => m.RoundsTabsComponent),
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
    loadComponent: () => import('./stats-tabs/stats-tabs.component').then(m => m.StatsTabsComponent),
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
    loadComponent: () => import('./libraries/index.component').then(m => m.IndexComponent),
    data: { metaDescription: {
      title: 'DG Japan - 資料室',
      subtitle: '資料室'
    }}
  },
  {
    path: 'libraries/classifications',
    loadComponent: () => import('./libraries/classifications.component').then(m => m.ClassificationsComponent),
    data: { metaDescription: {
      title: 'DG Japan - 選手の分類と部門',
      subtitle: '選手の分類と部門'
    }}
  },
  {
    path: 'libraries/divisions',
    loadComponent: () => import('./libraries/divisions.component').then(m => m.DivisionsComponent),
    data: { metaDescription: {
      title: 'DG Japan - 部門、レーティング、ポイント',
      subtitle: '部門、レーティング、ポイント'
    }}
  },
  {
    path: 'libraries/faqratings',
    loadComponent: () => import('./libraries/faq-ratings.component').then(m => m.FaqRatingsComponent),
    data: { metaDescription: {
      title: 'DG Japan - FAQ:レーティング編',
      subtitle: 'FAQ:レーティング編'
    }}
  },
  {
    path: 'libraries/nonstandards',
    loadComponent: () => import('./libraries/non-standard-rules.component').then(m => m.NonStandardRulesComponent),
    data: { metaDescription: {
      title: 'DG Japan - 非標準規則の採用に関して',
      subtitle: '非標準規則の採用に関して'
    }}
  },
  {
    path: 'libraries/playerpack',
    loadComponent: () => import('./libraries/playerpack.component').then(m => m.PlayerpackComponent),
    data: { metaDescription: {
      title: 'DG Japan - 賞品の価値に見合う品目',
      subtitle: '賞品の価値に見合う品目'
    }}
  },
  {
    path: 'libraries/points',
    loadComponent: () => import('./libraries/points.component').then(m => m.PointsComponent),
    data: { metaDescription: {
      title: 'DG Japan - ポイントの仕組み',
      subtitle: 'ポイントの仕組み'
    }}
  },
  {
    path: 'libraries/ratings',
    loadComponent: () => import('./libraries/ratings.component').then(m => m.RatingsComponent),
    data: { metaDescription: {
      title: 'DG Japan - レーティングの仕組み',
      subtitle: 'レーティングの仕組み'
    }}
  },
  {
    path: 'libraries/reclassification',
    loadComponent: () => import('./libraries/reclassification.component').then(m => m.ReclassificationComponent),
    data: { metaDescription: {
      title: 'DG Japan - プロからアマへの再登録',
      subtitle: 'プロからアマへの再登録'
    }}
  },
  {
    path: 'libraries/ordgcm', redirectTo: 'libraries/ordgcm24', pathMatch: 'full'
  },
  {
    path: 'libraries/ordgcm24',
    loadComponent: () => import('./libraries/ordgcm24.component').then(m => m.OrdgCm24Component),
    data: { metaDescription: {
      title: 'DG Japan - 公式規則と競技マニュアル(2024)',
      subtitle: '公式規則と競技マニュアル(2024)'
    }}
  },
  {
    path: 'libraries/ordgcm23',
    loadComponent: () => import('./libraries/ordgcm23.component').then(m => m.OrdgCm23Component),
    data: { metaDescription: {
      title: 'DG Japan - 公式規則と競技マニュアル(2023)',
      subtitle: '公式規則と競技マニュアル(2023)'
    }}
  },
  {
    path: 'libraries/ts', redirectTo: 'libraries/ts2024', pathMatch: 'full'
  },
  {
    path: 'libraries/ts2024',
    loadComponent: () => import('./libraries/ts2024.component').then(m => m.Ts2024Component),
    data: { metaDescription: {
      title: 'DG Japan - 国際大会の基準(2024)',
      subtitle: '国際大会の基準(2024)'
    }}
  },
  {
    path: 'libraries/ts2023',
    loadComponent: () => import('./libraries/ts2023.component').then(m => m.Ts2023Component),
    data: { metaDescription: {
      title: 'DG Japan - 国際大会の基準(2023)',
      subtitle: '国際大会の基準(2023)'
    }}
  },
  {
    path: 'libraries/trueamateur',
    loadComponent: () => import('./libraries/true-amateur.component').then(m => m.TrueAmateurComponent),
    data: { metaDescription: {
      title: 'DG Japan - 真のアマチュア大会',
      subtitle: '真のアマチュア大会'
    }}
  },
  {
    path: 'libraries/tourstandards',
    loadComponent: () => import('./libraries/tour-standards.component').then(m => m.TourStandardsComponent),
    data: { metaDescription: {
      title: 'DG Japan - ツアー基準',
      subtitle: 'ツアー基準'
    }}
  },
  {
    path: 'libraries/programguid',
    loadComponent: () => import('./libraries/programguid.component').then(m => m.ProgramguidComponent),
    data: { metaDescription: {
      title: 'DG Japan - 国際プログラムガイド',
      subtitle: '国際プログラムガイド'
    }}
  },

  {
    path: 'about',
    loadComponent: () => import('./about-this-site/about-this-site.component').then(m => m.AboutThisSiteComponent),
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
