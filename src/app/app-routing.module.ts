import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'prelogin',
    loadChildren: () => import('./prelogin/prelogin.module').then( m => m.PreloginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'subscribe',
    loadChildren: () => import('./subscribe/subscribe.module').then( m => m.SubscribePageModule)
  },
  {
    path: 'product-detail/:product_id',
    loadChildren: () => import('./product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  },
  {
    path: 'product/:product_id',
    loadChildren: () => import('./product/product.module').then( m => m.ProductPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
