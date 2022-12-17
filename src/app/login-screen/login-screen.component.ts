import {Component, NgModule} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {Md5} from "ts-md5";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
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

    async login() {
        if (this.loginUserName.trim().length < 1 || this.loginPassword.length < 1) {
            return;
        }

        let user = await firstValueFrom(this.http.post("http://localhost:8000/get_user", {
            name: this.loginUserName,
            password: this.loginPassword,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })).then(value => value).catch(reason => reason)

        if (user instanceof HttpErrorResponse) {
            alert("Ether Username or password is wrong!")
            return
        }

        let jwt$ = await firstValueFrom(this.http.post("http://localhost:8000/generate_jwt", {
            name: this.loginUserName,
            password: this.loginPassword
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })).then(value => value).catch(reason => reason)
        let jwt: string = jwt$["token"];

        localStorage.setItem("broad_code_jwt", jwt);
        this.router.navigate(['/main']);

    }

    async registerUser() {
        if (this.registerPassword.trim().length < 1 || this.registerUserName.length < 1 || this.registerUserType.length < 1) {
            return;
        }

        let user = await firstValueFrom(this.http.post("http://localhost:8000/add_user", {
            name: this.registerUserName,
            password: this.registerPassword,
            typee: this.registerUserType,
        }, {headers: {
                'Content-Type': 'application/json'
            }})).then(value => value).catch(reason => reason)

        if (user instanceof HttpErrorResponse) {
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
