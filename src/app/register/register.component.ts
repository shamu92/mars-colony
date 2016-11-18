import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { NewColonist, Job } from '../models';
import JobsService from '../services/jobs.service';
import ColonistsService from '../services/colonists.service'

import {cantBe} from '../shared/Validators'

import { Router, ActivatedRoute } from '@angular/router';

// function cantBe(value:string): ValidatorFn {
//   return (control:AbstractControl): {[key:string]: any} => {
//     return value === '(none)' ? {'cant be none': {value}} : null;
//   };}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[JobsService, ColonistsService]
})
export class RegisterComponent implements OnInit {

  colonist: NewColonist;
  marsJobs: Job[];
  registerForm: FormGroup;
  blinkRed : boolean;
  
  NO_JOB_SELECTED = '(none)';

constructor(jobService: JobsService,
            private colonistsService:ColonistsService,
            private router: Router) {
    
  jobService.getJobs().subscribe((jobs) => {
    this.marsJobs = jobs;
    
  }, err => {
    console.log(err);
  });
}

tooOld(value:number): ValidatorFn {
  return (control:AbstractControl): {[key:string]: any} => {
    return control.value > value ? {'too old': {value}} : null;
  };
}
  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      age: new FormControl('', [Validators.required, this.tooOld(114)]),
      job_id: new FormControl('(none)',[cantBe(this.NO_JOB_SELECTED)])
    });
  }

onSubmit(event){
  event.preventDefault();
  if (this.registerForm.invalid) {
    this.blinkRed = true;
  } else {
    // const colonist = this.registerForm.get (['name', 'age', 'job_id'])
    const name = this.registerForm.get('name').value;
    const age = this.registerForm.get('age').value;
    const job_id = this.registerForm.get('job_id').value;

    const colonist = new NewColonist(name, age, job_id);
    // new NewColonist(name, age, job_id);
    this.colonistsService.submitColonist(colonist).subscribe(
      (colonist)=> {
          localStorage.setItem('colonist_id', JSON.stringify(colonist.id));
          this.router.navigate(['/encounters'])      
          }, err => {
      console.log(err)});
  //   console.log("OK, let's register this new colonist", new NewColonist(name, age, job_id))
  // }
  // event.preventDefault();
// registerForm.form.controls.name.invalid= true
    }
};
}
