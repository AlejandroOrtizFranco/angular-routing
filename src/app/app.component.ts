import { Component } from '@angular/core';
import { Router,Event,NavigationStart,NavigationEnd,NavigationCancel,NavigationError } from '@angular/router';
import { slideInAnimation } from './app.animation';
import { MessageService } from './messages/message.service';

import { AuthService } from './user/auth.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  loading = true;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  get isMessageDisplay():boolean{
    return this.messageService.isDisplay;
  }

  constructor(private authService: AuthService, private router:Router, public messageService:MessageService) {
    router.events.subscribe((routerEvent:Event)=>{ //nos subscribimos a un event para ver cuando algo ocurra
      this.checkRouterEvents(routerEvent);
    })
  }
  checkRouterEvents(routerEvent: Event) {
    if(routerEvent instanceof NavigationStart){
      this.loading=true;
    }

    if(routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError){
          this.loading=false;
        }
  }

  logOut(): void {
    this.authService.logout();
    console.log('Log out');
    this.router.navigateByUrl('/welcome');
  }

  displayMessages(): void{
    this.router.navigate([{ outlets : {popup: ['messages']} }]);
    this.messageService.isDisplay = true;
  }

  hideMessages(): void{
    this.router.navigate
    this.messageService.isDisplay = false;
  }
}
