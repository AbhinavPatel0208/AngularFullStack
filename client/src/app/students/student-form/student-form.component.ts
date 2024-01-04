import { StudentsService } from './../../services/students.service';
import { JsonPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe,RouterLink],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit,OnDestroy{

  form!: FormGroup;
  studentformSubscription!: Subscription;
  StudentsService = inject(StudentsService);


  isEdit=false;

  constructor(private fb: FormBuilder,private activatedRouter:ActivatedRoute)
  { 

  }

  ngOnDestroy(): void { 
    if (this.studentformSubscription) { 
      this.studentformSubscription.unsubscribe();
    }
  }

  onSubmit() { 
    this.studentformSubscription=this.StudentsService.addStudent(this.form.value).subscribe({
      next: (response) => { 
        console.log(response);
      },
      error: err => { 
        console.log(err);
      }
    })
    
  }

  ngOnInit(): void {

    this.activatedRouter.params.subscribe(
      {
        next:(response)=> {
          console.log(response['id']);
          this.StudentsService.getStudentMethod(response['id']).subscribe({
            next:response=> {
              this.form.patchValue(response)
              this.isEdit = true;
            },
            error:err=> {
              console.log(err);
              
            },
          })
        },
        error:err=> {
          console.log(err);
          
        },
      }
    )

    this.form = this.fb.group({
      name:['',Validators.required],
      address:[],
      phoneNumber:[], 
      email:['',Validators.email]
    })
  }

}
