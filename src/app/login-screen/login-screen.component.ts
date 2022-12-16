import {Component, NgModule} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {Md5} from "ts-md5";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})

export class LoginScreenComponent {

  constructor(private router: Router, private http: HttpClient) {

  }

  ngOnInit() {
  }

  register = false;

  passwordType = "password";
  loginUserName: String = "";
  loginPassword: String = "";

  registerUserName: String = "";
  registerPassword: String = "";
  registerUserType: String = "";

  readonly ROOT_URL = "http://127.0.0.1"

  async login() {
    if (this.loginUserName.trim().length < 1 || this.loginPassword.length < 1) {
      return;
    }

    let user = await fetch(this.ROOT_URL + ":8000/get_user", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: this.loginUserName, password: this.loginPassword})
    }).then(res => res.json())
      .then(res => res)
      .catch(err => console.log(err));

    if (user !== undefined) {
      let jwt = await fetch(this.ROOT_URL + ":8000/generate_jwt", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: this.loginUserName, password: this.loginPassword})
      }).then(res => res.json())
        .then(res => res["token"])
        .catch(err => console.log(err));

      localStorage.setItem("broad_code_jwt", jwt);

      this.router.navigate(['/main']).then(r => {})
    } else {
      alert("Invalid User!")
    }
  }

  async registerUser() {
    if (this.registerPassword.trim().length < 1 || this.registerUserName.length < 1 || this.registerUserType.length < 1) {
      return;
    }

    let user = await fetch(this.ROOT_URL + ":8000/add_user", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: this.registerUserName, password: this.registerPassword})
    }).then(res => res.json())
      .then(res => res)
      .catch(err => console.log(err));

    if (user === undefined) {
      alert("Username already in use!")
      return;
    }

    this.register = false;
  }

  changeVisibility(event: MouseEvent) {
    this.passwordType = this.passwordType === "password" ? "text" : "password";
    console.log((event.target as HTMLElement).classList.toggle("bi-eye"));
  }

  viewRegister() {
    this.register = !this.register;
  }
}
