import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// noinspection ES6UnusedImports
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

// Pages
import { AboutComponent } from './pages/about/about.component';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FaqComponent } from './pages/faq/faq.component';
import { FriendLinkComponent } from './pages/friend-link/friend-link.component';
import { HomeComponent } from './pages/home/home.component';
import { InvalidLinkComponent } from './pages/invalid-link/invalid-link.component';
import { MsgSentComponent } from './pages/msg-sent/msg-sent.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SigningComponent } from './pages/signing/signing.component';
import { TermsOfServiceComponent } from './pages/terms-of-service/terms-of-service.component';
import { ViewingComponent } from './pages/viewing/viewing.component';
import { VirtrolioCoverComponent } from './pages/virtrolio-cover/virtrolio-cover.component';

// Services
import { LoginResolver } from './core/login-resolver';
import { RejeccComponent } from './pages/rejecc/rejecc.component';
import { SigningGuard } from './core/signing.guard';

// noinspection JSUnusedLocalSymbols
const redirectUnauthorized = () => redirectUnauthorizedTo([ '/access-denied' ]);

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    resolve: { user: LoginResolver }
  },
  { path: 'about', component: AboutComponent },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'friend-link', component: FriendLinkComponent},
  { path: 'invalid-link' , component: InvalidLinkComponent },
  {
    path: 'msg-sent',
    component: MsgSentComponent,
    canActivate: [ AngularFireAuthGuard ],
    data: { authGuardPipe: redirectUnauthorized }
  },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'rejecc', component: RejeccComponent },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [ AngularFireAuthGuard ],
    data: { authGuardPipe: redirectUnauthorized }
  },
  {
    path: 'signing',
    component: SigningComponent,
    canActivate: [ SigningGuard ],
    resolve: { user: LoginResolver }
  },
  { path: 'terms-of-service', component: TermsOfServiceComponent },
  {
    path: 'viewing',
    component: ViewingComponent,
    canActivate: [ AngularFireAuthGuard ],
    data: { authGuardPipe: redirectUnauthorized },
    resolve: { user: LoginResolver }
  },
  {
    path: 'virtrolio-cover',
    component: VirtrolioCoverComponent,
    canActivate: [ AngularFireAuthGuard ],
    data: { authGuardPipe: redirectUnauthorized },
    resolve: { user: LoginResolver }
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/page-not-found' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})], // scroll to top when routerLinking
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
