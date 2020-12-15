import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectivePreloandingStrategyService } from './services/selective-preloanding-strategy.service';
import { ModulImageCompanyModule } from './modul-image-company/modul-image-company.module';

const routes: Routes = [
  {
    path: 'data-company',
    loadChildren: () => import('./modul_data_company/profile-company/profile-company.module').then(m => m.ProfileCompanyModule),
    data: {
      preload: true
    }
  },
  {
    path: 'products-company',
    // tslint:disable-next-line: max-line-length
    loadChildren: () => import('./modul_data_company/products-and-services/products-and-services.module').then(m => m.ProductsAndServicesModule),
    data: {
      preload: false
    }
  },
  {
    path: 'profile-company',
    // tslint:disable-next-line: max-line-length
    loadChildren: () => import('./modul_data_company/perfil/perfil.module').then(m => m.PerfilModule),

    data: {
      preload: true
    }
  },
  {
    path: 'busqueda',
    // tslint:disable-next-line: max-line-length
    loadChildren: () => import('./module-search/module-search.module').then(m => m.ModuleSearchModule),

    data: {
      preload: false
    }
  },
  {
    path: 'marcas-company',
    // tslint:disable-next-line: max-line-length
    loadChildren: () => import('./modul_data_company/marcas/marcas.module').then(m => m.MarcasModule),
    data: {
      preload: true
    }
  },
  {
    path: 'giros-company',
    // tslint:disable-next-line: max-line-length
    loadChildren: () => import('./modul_data_company/giros/giros.module').then(m => m.GirosModule),
    data: {
      preload: true
    }
  },
  {
    path: 'certifications-company',
    loadChildren: () => import('./modul_data_company/certifications/certifications.module').then(m => m.CertificationsModule),
    data: {
      preload: true
    }
  },
  {
    path: 'associations-company',
    loadChildren: () => import('./modul_data_company/associations/associations.module').then(m => m.AssociationsModule),
    data: {
      preload: true
    }
  },
  {
    path: 'image-company',
    loadChildren: () => import('./modul-image-company/modul-image-company.module').then(m => m.ModulImageCompanyModule),
    data: {
      preload: true
    }
  },
  {
    path: 'riesgo-company',
    loadChildren: () => import('./module-riesgo/module-riesgo.module').then(m => m.ModuleRiesgoModule),

    data: {
      preload: true
    }
  },
  {
    path: 'analisis-company',
    // tslint:disable-next-line: max-line-length
    loadChildren: () => import('./modul_analisis/analisis/analisis.module').then(m => m.AnalisisModule),
    data: {
      preload: true
    }
  },
  {
    path: 'notifications-company',
    // tslint:disable-next-line: max-line-length
    loadChildren: () => import('./modul_data_company/visits/visits.module').then(m => m.VisitsModule),
    data: {
      preload: true
    }
  },
  {
    path: 'visitis-company',
    // tslint:disable-next-line: max-line-length
    loadChildren: () => import('./modul_data_company/visitm/visitm.module').then(m => m.VisitmModule),
    data: {
      preload: true
    }
  },
  {
    path: 'data-user',
    loadChildren: () => import('./module_data_user/profile-user/profile-user.module').then(m => m.ProfileUserModule),
    data: {
      preload: true
    }
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'miplan',
    loadChildren: () => import('./modul_data_company/miplan/miplan.module').then(m => m.MiplanModule),
    data: {
      preload: true
    }
  },
  {
    path: 'qualify',
    loadChildren: () => import('./module-qualify/module-qualify.module').then(m => m.ModuleQualifyModule),
    data: {
      preload: false
    }
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: true,
      preloadingStrategy: SelectivePreloandingStrategyService
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
