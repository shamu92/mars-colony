import { Component, OnInit } from '@angular/core';

import { Encounter } from '../models';
import EncountersService from '../services/encounters.service'

@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styleUrls: ['./encounters.component.css'],
  providers:[EncountersService]
})
export class EncountersComponent implements OnInit {

  marsEncounters: Encounter[];


  constructor(encounterService: EncountersService) {
    
    encounterService.getEncounters().subscribe((encounters) => {
      this.marsEncounters = encounters;
     
    }, err => {
      console.log(err);
    });
   }

  ngOnInit() {
  }



}