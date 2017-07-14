import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-console',
  templateUrl: './app-console.component.html',
  styleUrls: ['./app-console.component.css']
})
export class AppConsoleComponent{
  // need a way to get log entries to display

  // also need a reference to logging service
  // to allow for configuration via input

  constructor() {
  }

  submitInput(): void {
    // todo
  }
}
