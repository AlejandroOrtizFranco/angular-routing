import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth.guard';
import { SelectiveStrategyService } from './selective-strategy.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      {path: 'products',
      //canActivate:[AuthGuard] , se cambio por canLoad, si tenemos preloadgin debemos usar canActivate
        canLoad:[AuthGuard],
        data:{preload:true}, //data: son datos que queremos pasar
        loadChildren: ()=>
          import('./products/product.module').then(m=>m.ProductModule)},
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ],
    {preloadingStrategy:SelectiveStrategyService},
    //{enableTracing:true}
      )], //para ver todo
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
