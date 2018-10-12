import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  isAndroid: boolean;

  constructor() {

      this.isAndroid = navigator.userAgent.toLowerCase().indexOf('android')>-1;
  }

  ngOnInit() {
  }

}
