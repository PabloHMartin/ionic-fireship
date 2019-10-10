import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private alertController: AlertController
  ) {}

    async canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Promise<boolean> {
      const uid = await this.auth.uid();
      const isLoggedIn = !!uid;

      if (!isLoggedIn) {
        const alert = await this.alertController.create({
          header: 'Blocked',
          subHeader: 'Users only',
          message: 'You have been blocked by the router guard...',
          buttons: ['OK']
        });

        await alert.present();
      }
      return isLoggedIn;
    }
}
