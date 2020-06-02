import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  isCardView: boolean = false;
  userMsgData = [{  'author': 'Rammy',
                    'message': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                    'fontfamily': 'Montserrat',
                    'fontstyle': 'regular',
                    'fontcolor': '#FFFFFF',
                    'bgcolor': '#55d3f2'},
                  { 'author': 'Alice',
                    'message': 'Have a good summer',
                    'fontfamily': 'Courier New',
                    'fontstyle': 'bold',
                    'fontcolor': '#FFFFFF',
                    'bgcolor': '#ff6b8b'},
                  { 'author': 'Bob',
                    'message': 'Goodbye',
                    'fontfamily': 'Montserrat',
                    'fontstyle': 'italic',
                    'fontcolor': '#696969',
                    'bgcolor': '#f76534'}];
  constructor() { }

  ngOnInit(): void {
  }

  toggleViewStyle() {
    this.isCardView = this.isCardView === false ? true : false;
  }

}
