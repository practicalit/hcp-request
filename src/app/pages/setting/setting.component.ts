import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  public check1: boolean = true;
  public check2: boolean = true;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
