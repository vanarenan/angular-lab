import { Component, OnInit } from '@angular/core';
//import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { StudentsService } from '../students.service';
import { SubjectsService } from '../../subjects/subjects.service';
import { Student } from '../student';
import { Subject } from '../../subjects/subject';

@Component({
  selector: 'app-update',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent implements OnInit {

  student: Student[];
  subjectsData: Subject[] = [];

  constructor(
//    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public studentsService: StudentsService,
    public subjectsService: SubjectsService
  ) {
//    this.itemForm = this.fb.group({id: null, name: null, subjects: new FormArray([])});
  }
  
//  submitForm() {
//    let values = this.itemForm.value;
//    let subjects = [];
//    this.subjectsData.forEach((o, i) => {
//      if (values.subjects[i]) subjects.push(o.id);
//    });
//    values.subjects = subjects;
//    this.service.update(this.itemForm.value.id, values).subscribe(res => {
//      this.router.navigateByUrl('/teachers/home');
//    });
//  }

  getPoints(id: number): string {
    return this.student['points'].filter((o) => o.subjectId == id).map((o) => o.point).join(', ');
  }
  
  getSubjectName(id: number): string {
    return this.subjectsData.filter((o) => o.id == id).map((o) => o.name).join('');
  } 
  
  addPoint(id: number): void {
    let point = prompt('Додати бал з предмету "' + this.getSubjectName(id) + '"');
    if (parseInt(point) >= 0 && parseInt(point) <= 100) {
      this.updatePoints(id, parseInt(point));
    } else {
      alert('Введіть число від 0 до 100!');
    }
  }
  
  updatePoints(id: number, point: number): void {
    this.studentsService.updatePoints(this.student['id'], {subjectId: id, point: point}).subscribe(res => {
      this.router.navigateByUrl('/students/points/' + this.student['id']);
    });
  }
  
  ngOnInit(): void {
    this.subjectsService.getAll().subscribe((data: Subject[]) => {
      this.subjectsData = data;
      let id = this.route.snapshot.params.itemId;
      this.studentsService.getById(id).subscribe((data: Student[]) => {
        this.student = data;
//        this.subjectsData.forEach((o, i) => {
//          let checked = (data.subjects.indexOf(o.id) != -1); 
//          const control = new FormControl(checked);
//          (this.itemForm.controls.subjects as FormArray).push(control);
//        });
      });
    });
  }

}
