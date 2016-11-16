import { Component, OnInit } from '@angular/core';
import { Alien } from '../models';
import AliensService from '../services/aliens.service'

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers:[AliensService]
})
export class ReportComponent implements OnInit {

  marsAliens: Alien[]

  constructor(alienService: AliensService) {
    alienService.getAliens().subscribe((aliens) => {
      this.marsAliens = aliens;
      console.log(aliens)
    }, err => {
      console.log(err);
    });
   }

  ngOnInit() {
  }

}
