import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {firstValueFrom, Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router, private http: HttpClient) {
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {


    let verify = await firstValueFrom(this.http.post("http://localhost:8000/validate_jwt", "")).then(
      value => value
    ).catch(reason => console.log(reason))

/*
    let verify = await fetch("http://localhost:8000/validate_jwt", {
      method: "POST",
      headers: {
        'Authorization': localStorage.getItem("broad_code_jwt") as string,
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
      .then(res => res)
      .catch(err => console.log(err));
 */

    if (verify === true) {
      this.router.navigate(['/main']).then(r => {})
      return false;
    }

    return true;
  }

}
