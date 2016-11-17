import { Component, OnInit } from '@angular/core';
import { Alien, Encounter } from '../models';
import AliensService from '../services/aliens.service'

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers:[AliensService]
})
export class ReportComponent implements OnInit {

  marsAliens: Alien[]

  report: Encounter;

  NO_ALIENS_SELECTED = '(none)';

  constructor(alienService: AliensService) {

    this.report = new Encounter (null,'2012-11-02', 1, null, null )
    alienService.getAliens().subscribe((aliens) => {
      this.marsAliens = aliens;
      console.log(aliens)
    }, err => {
      console.log(err);
    });
   }

  ngOnInit() {
  }

getalienSelected(){
  return this.report.atype === this.NO_ALIENS_SELECTED;
}
}
