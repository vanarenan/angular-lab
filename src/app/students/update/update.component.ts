import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { StudentsService } from '../students.service';
import { Student } from '../student';

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
    public service: StudentsService
  ) { }
  
  submitForm() {
    this.service.update(this.itemForm.value.id, this.itemForm.value).subscribe(res => {
      this.router.navigateByUrl('/students/home');
    });
  }

  ngOnInit(): void {
    this.itemForm = this.fb.group({id: null, name: null, group: null});
    let id = this.route.snapshot.params.itemId;
    this.service.getById(id).subscribe((data: Student[]) => {
      this.itemForm = this.fb.group(data);
    });
  }

}
