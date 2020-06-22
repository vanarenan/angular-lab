import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { TeachersService } from '../teachers.service';
import { Teacher } from '../teacher';

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
    public service: TeachersService
  ) { }
  
  submitForm() {
    this.service.create(this.itemForm.value).subscribe(res => {
      console.log('Item created!');
      this.router.navigateByUrl('/teachers/home');
    });
  }

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      name: ['']    
    })
  }

}
