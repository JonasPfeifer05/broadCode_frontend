import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent {

  constructor(private router: Router) {
  }

  logout() {
    localStorage.removeItem("broad_code_jwt");
    this.router.navigate(['/login']).then(r => {
    })
  }
}
