import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TeachersService } from '../teachers.service';
import { Teacher } from '../teacher';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  itemForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public service: TeachersService
  ) { }
  
  submitForm() {
    this.service.create(this.itemForm.value).subscribe(res => {
      console.log('Item created!');
      this.router.navigateByUrl('/teachers/home');
    });
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params.itemId;
    this.service.getById(id).subscribe((data: Teacher)=> {
      this.itemForm = this.fb.group(data);
    });
  }

}
