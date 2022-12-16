import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'broadcode';

  ngOnInit(): void {
    window.onbeforeunload = () => {

    }
  }

}

