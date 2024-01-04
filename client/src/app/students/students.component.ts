import { Student} from './../types/student';
import { StudentsService } from './../services/students.service';
import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [AsyncPipe,CommonModule,RouterLink],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{

  students$!:Observable<Student[]>
  studentsService = inject(StudentsService);

  ngOnInit(): void {
    this.students$ = this.studentsService.getStudents()
  }

}
