import { Component, computed, OnInit, signal, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'toolbar',
  standalone: true,
  imports: [CommonModule,MatToolbarModule, MatButtonModule, MatIconModule,MatSidenavModule,MatListModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;


  collapsed = signal(true);
  menuOpen: boolean = false;


  constructor(private observer:BreakpointObserver){}

  showHideSidebar(){


    if(this.collapsed()){
      this.sidenav.mode = 'over';
      this.collapsed.set(!this.collapsed())
      this.sidenav.open();

    }else{

      this.sidenav.mode = 'side';
      this.sidenav.close();
      this.collapsed.set(!this.collapsed())
    }

  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }


}
