import { StudentsService } from './../../services/students.service';
import { JsonPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  paramsSubscription!: Subscription;
  StudentsService = inject(StudentsService);


  isEdit=false;

  constructor(private fb: FormBuilder,private activatedRouter:ActivatedRoute,private router:Router)
  { 

  }

  ngOnDestroy(): void { 
    if (this.studentformSubscription) { 
      this.studentformSubscription.unsubscribe();
    }

    if (this.paramsSubscription) { 
      this.paramsSubscription.unsubscribe();
    }

  }

  onSubmit() { 
    this.studentformSubscription=this.StudentsService.addStudent(this.form.value).subscribe({
      next: (response) => { 
        console.log(response);
        this.router.navigateByUrl('/students');
      },
      error: err => { 
        console.log(err);
      }
    })
    
  }

  ngOnInit(): void {

    this.paramsSubscription=this.activatedRouter.params.subscribe(
      {
        next:(response)=> {
          console.log(response['id']);
          let id = response['id'];
          if (!id) return;

          this.StudentsService.getStudentMethod(id).subscribe({
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
