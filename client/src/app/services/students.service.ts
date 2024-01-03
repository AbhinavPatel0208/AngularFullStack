import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student} from '../types/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }
  
  getStudents = ():Observable<Student[]>=> this.http.get<Student[]>("http://localhost:5057/api/student")
}
