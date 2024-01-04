import { ToastrService } from 'ngx-toastr';
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
  styleUrl: './students.component.css',
  providers: [ToastrService] 
})
export class StudentsComponent implements OnInit{

  students$!: Observable<Student[]>
 // toastrService!: ToastrService;

  studentsService = inject(StudentsService);

  constructor(private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  delete(id:number) { 
    console.log(id);
    
    this.studentsService.deleteStudent(id).subscribe(
      {
        next: (response) => { 
          this.toastrService.success("Successfully deleted");
          this.getStudents();
        },
        error:(err)=> {
          console.log(err);
          this.toastrService.success("Successfully deleted");
        },
      }
    )
  }

  private getStudents(): void { 
    this.students$=this.studentsService.getStudents()
  }

}
