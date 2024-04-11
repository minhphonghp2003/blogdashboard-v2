import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './pages/post/post.component';
import { WorkComponent } from './pages/work/work.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PostInformationComponent } from './pages/post-information/post-information.component';
import { authGuard } from './service/auth-guard.guard';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { WorkDetailComponent } from './pages/work-detail/work-detail.component';
import { workDetailGuard } from './service/work-detail.guard';
import { StatisticComponent } from './pages/statistic/statistic.component';
import { CommentComponent } from './pages/comment/comment.component';
import { RoleManage } from './pages/role-manage/role-manage-component.component';
import { adminGuard } from './service/admin-guard.guard';

export const routes: Routes = [
    { path: "home", component: HomeComponent, canActivate: [authGuard] },
    { path: "post", component: PostComponent, canActivate: [authGuard] },
    { path: "postInfo", component: PostInformationComponent, canActivate: [authGuard] },
    { path: "profile", component: ProfileComponent, canActivate: [authGuard] },
    { path: "work", component: WorkComponent, canActivate: [authGuard] },
    {
        path: "work/:id", children: [
            { path: '', redirectTo: 'statistic', pathMatch: 'full' },
            {
                path: "statistic",
                component: StatisticComponent
            },
            {
                path: "comment",
                component: CommentComponent
            },
            {
                path: "edit",
                component: PostComponent
            }
        ], component: WorkDetailComponent, canActivate: [workDetailGuard]
    },
    { path: "login", component: LoginComponent },
    { path: "roleMng", component: RoleManage,canActivate:[authGuard,adminGuard] },
    { path: "forgot", component: ForgotPasswordComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent }];

