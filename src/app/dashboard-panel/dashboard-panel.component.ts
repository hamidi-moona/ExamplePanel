import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-panel',
  templateUrl: './dashboard-panel.component.html',
  styleUrls: ['./dashboard-panel.component.scss']
})
export class DashboardPanelComponent implements OnInit {

  constructor(private route:Router) { }
  UID = localStorage.getItem('token');

  ngOnInit(): void {
  }

  links()
  {
    this.route.navigate(['userPanel'],{queryParams:{UID: this.UID}});
  }

}
