import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { MsgIoService } from './msg-io.service';

@Injectable({
  providedIn: 'root'
})

/**
 * AuthGuard on all /signing pages. Redirects to /friend-link if not signed in, redirect to /invalid-link
 * if invalid uid or key.
 *
 * @param uid - extracted from url manually using RegEx
 * @param key - extracted from url manually using RegEx
 *
 */
export class SigningGuard implements CanActivate {
  static uid = 'invalid';
  static key = 'invalid';

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router,
              private msgIOService: MsgIoService) { }

  // noinspection JSUnusedLocalSymbols
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Regex Extraction of 'uid' and 'key' params
    try {
      const linkStr = window.location.href;
      SigningGuard.uid = linkStr.match(/uid=([^&]*)/)[1];
      SigningGuard.key = linkStr.match(/key=([^&]*)/)[1];
    } catch (e) {
      this.router.navigate([ '/invalid-link' ]);
    }

    /** Redirection based on authService.checkKey() & authService.isLoggedIn() */
    return this.authService.checkKey(SigningGuard.uid, SigningGuard.key).then(validKey => {
      if (validKey === false) {
        this.router.navigate([ '/invalid-link' ]);
        return false;
      }

      this.msgIOService.checkForMessage(SigningGuard.uid).then((signed) => {
        if (signed) {
          this.router.navigate([ '/rejecc' ]);
          return false;
        }
      }).catch(() => {
        this.router.navigate([ '/invalid-link' ]);
      });

      if (this.authService.isLoggedIn()) {
        return true;
      } else {
        this.router.navigate([ '/friend-link' ], { queryParams: { uid: SigningGuard.uid, key: SigningGuard.key } });
        return false;
      }
    })
      .catch(() => {
        this.router.navigate([ '/invalid-link' ]);
        return false;
      });
  }
}
