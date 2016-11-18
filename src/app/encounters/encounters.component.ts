import { Component, OnInit } from '@angular/core';

import { Encounter } from '../models';
import EncountersService from '../services/encounters.service'

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styleUrls: ['./encounters.component.scss'],
  providers:[EncountersService]
})
export class EncountersComponent implements OnInit {

  marsEncounters: Encounter[];


  constructor(encounterService: EncountersService,
                private router: Router) {
    
    encounterService.getEncounters().subscribe((encounters) => {
      this.marsEncounters = encounters;
     
    }, err => {
      console.log(err);
    });
   }

  ngOnInit() {
  }
onSubmit(event){
  event.preventDefault();
  this.router.navigate(['/register']);

}


}