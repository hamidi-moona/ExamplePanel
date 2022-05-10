import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DashboardPanelComponent } from './dashboard-panel/dashboard-panel.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { RouteResolver } from './resolvers/route.resolver';

import { RoleGuard } from './shared/role.guard';
import { UserPanelComponent } from './user-panel/user-panel.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'index',component:DashboardPanelComponent},
  {path:'AdminPanel',component:AdminPanelComponent,canActivate:[RoleGuard]},
  {path:'userPanel',component:UserPanelComponent},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  providers:[RouteResolver],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
