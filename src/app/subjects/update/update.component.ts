import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SubjectsService } from '../subjects.service';
import { Subject } from '../subject';

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
    public service: SubjectsService
  ) { }
  
  submitForm() {
    this.service.update(this.itemForm.value.id, this.itemForm.value).subscribe(res => {
      this.router.navigateByUrl('/subjects/home');
    });
  }

  ngOnInit(): void {
    this.itemForm = this.fb.group({id: null, name: null});
    let id = this.route.snapshot.params.itemId;
    this.service.getById(id).subscribe((data: Subject[]) => {
      this.itemForm = this.fb.group(data);
    });
  }

}
