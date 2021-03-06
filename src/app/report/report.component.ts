import { Component, OnInit } from '@angular/core';
import { Alien, NewEncounter } from '../models';
import AliensService from '../services/aliens.service'
import EncountersService from '../services/encounters.service'
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import{ cantBe } from '../shared/Validators'

import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers:[AliensService, EncountersService]
})
export class ReportComponent implements OnInit {

  marsAliens: Alien[];
  reportForm: FormGroup;
  report: NewEncounter;
  
  NO_ALIEN_SELECTED = '(none)';

  constructor(private alienService: AliensService,
              private encountersService: EncountersService,
              private router: Router) {
    // this.report = new Encounter (null,'2012-11-02', 1, null, null )
    alienService.getAliens().subscribe((aliens) => {
      this.marsAliens = aliens;
        }, err => {
      console.log(err);
    });
   }

  ngOnInit() {
    this.reportForm = new FormGroup({
      atype: new FormControl(this.NO_ALIEN_SELECTED, [cantBe(this.NO_ALIEN_SELECTED)]),
      action: new FormControl('', [Validators.required, Validators.maxLength(450)])
      
    })
  }
private getDate(){
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

onSubmit(event){
  event.preventDefault();
  const date = this.getDate();
  const atype = this.reportForm.get('atype').value;
  const action = this.reportForm.get('action').value;
  const colonist_id = localStorage.getItem('colonist_id');

  const encounter = new NewEncounter(date, colonist_id, atype, action);

  if (this.reportForm.invalid) {

  } else {
    this.encountersService.submitEncounter(encounter).subscribe(
      ()=> {
          this.router.navigate(['/encounters'])
    }, err => {
      console.log(err)});
    // const colonist = this.registerForm.get (['name', 'age', 'job_id'])
    // new NewColonist(name, age, job_id);
    }
};
}

