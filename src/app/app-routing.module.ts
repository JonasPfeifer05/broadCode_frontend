import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginScreenComponent} from "./login-screen/login-screen.component";
import { MainScreenComponent } from './main-screen/main-screen.component';
import { ErrorScreenComponent } from './error-screen/error-screen.component';
import { VerificationGuard } from './guards/verification.guard';
import {LoginGuard} from "./guards/login.guard";

const routes: Routes = [
  { path: "login", canActivate: [LoginGuard], component: LoginScreenComponent },
  { path: "main", canActivate: [VerificationGuard], component: MainScreenComponent},
  { path: "", redirectTo: "login", pathMatch: "full"},
  { path: "**", component: ErrorScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
