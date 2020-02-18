import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public currentUrl: string;

  constructor(private router: Router) {
    router.events.subscribe(() => {
      this.currentUrl = router.url;
    });
  }

  ngOnInit() {
  }

}
