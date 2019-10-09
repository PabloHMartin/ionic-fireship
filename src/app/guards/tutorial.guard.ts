import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router, RouterState } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TutorialGuard implements CanActivate {
  constructor(private sotrage: Storage, private router: Router) {}


  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const isComplete = await this.sotrage.get('tutorialComplete');

    if (!isComplete) {
      this.router.navigateByUrl('/tutorial');
    }

    return isComplete;

  }
}
