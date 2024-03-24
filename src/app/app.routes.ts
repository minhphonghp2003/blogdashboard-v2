import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/post/post.component';
import { WorkComponent } from './components/work/work.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostInformationComponent } from './components/post-information/post-information.component';
import { authGuard } from './service/auth-guard.guard';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

export const routes: Routes = [
    { path: "home", component: HomeComponent, canActivate: [authGuard] },
    { path: "post", component: PostComponent, canActivate: [authGuard] },
    { path: "postInfo", component: PostInformationComponent, canActivate: [authGuard] },
    { path: "profile", component: ProfileComponent, canActivate: [authGuard] },
    { path: "work", component: WorkComponent, canActivate: [authGuard] },
    { path: "login", component: LoginComponent },
    { path: "forgot", component: ForgotPasswordComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent }];

