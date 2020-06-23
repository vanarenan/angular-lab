import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { StudentsService } from '../students.service';
import { Student } from '../student';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  itemForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public service: StudentsService
  ) { }
  
  submitForm() {
    this.service.create(this.itemForm.value).subscribe(res => {
      this.router.navigateByUrl('/students/home');
    });
  }

  ngOnInit(): void {
    this.itemForm = this.fb.group({name: null, group: null});
  }

}
