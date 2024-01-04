import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student} from '../types/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  apiUrl = "http://localhost:5057/api/student";

  constructor(private http: HttpClient) { }
  
  getStudents = (): Observable<Student[]> => this.http.get<Student[]>(this.apiUrl)
  
  addStudent = (data: Student) => this.http.post(this.apiUrl, data);

  getStudentMethod = (id: number): Observable<Student> => this.http.get<Student>(this.apiUrl + '/' + id);
  
  deleteStudent = (id: number) => this.http.delete(this.apiUrl + '/' + id);
}
