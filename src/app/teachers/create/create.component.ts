import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { TeachersService } from '../teachers.service';
import { SubjectsService } from '../../subjects/subjects.service';
import { Teacher } from '../teacher';
import { Subject } from '../../subjects/subject';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  itemForm: FormGroup;
  subjectsData: Subject[] = [];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public service: TeachersService,
    public subjectsService: SubjectsService
  ) {
    this.itemForm = this.fb.group({name: null, subjects: (new FormArray([]))});
  }
  
  submitForm() {
    let values = this.itemForm.value;
    let subjects = [];
    this.subjectsData.forEach((o, i) => {
      if (values.subjects[i]) subjects.push(o.id);
    });
    values.subjects = subjects;
    this.service.create(values).subscribe(res => {
      this.router.navigateByUrl('/teachers/home');
    });
  }

  ngOnInit(): void {
    this.subjectsService.getAll().subscribe((data: Subject[]) => {
      this.subjectsData = data;
      this.subjectsData.forEach((o, i) => {
        const control = new FormControl();
        (this.itemForm.controls.subjects as FormArray).push(control);
      });
    });
  }

}
