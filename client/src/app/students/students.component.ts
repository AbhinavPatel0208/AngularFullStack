import { Student} from './../types/student';
import { StudentsService } from './../services/students.service';
import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{

  Students!:Observable<Student[]>
  StudentsService = inject(StudentsService);

  ngOnInit(): void {
    this.StudentsService.getStudents()
      .subscribe(
        {
          next: (response) => { 
            console.log(response);
          }
          ,
          error: (err) => { 
            console.log(err);
            
          }
        }
    )
  }

}
