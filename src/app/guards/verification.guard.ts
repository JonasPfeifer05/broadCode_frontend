import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {firstValueFrom, Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VerificationGuard implements CanActivate {

  constructor(private router: Router, private http: HttpClient) {
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    let verify = await firstValueFrom(this.http.get("http://localhost:8000/validate_jwt")).then(
      value => value
    ).catch(reason => console.log(reason))

    if (verify === true) {
      return true;
    }

    localStorage.removeItem("broad_code_jwt");
    this.router.navigate(["/unauthorized"]);
    return false;
  }

}
