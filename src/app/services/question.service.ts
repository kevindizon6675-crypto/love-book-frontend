import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Question, QuestionResponse, SaveAnswerRequest } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private http = inject(HttpClient);

  getAll(categoryId?: number): Observable<QuestionResponse> {
    const url = categoryId 
      ? `${environment.apiUrl}/questions?category_id=${categoryId}`
      : `${environment.apiUrl}/questions`;
    return this.http.get<QuestionResponse>(url);
  }

  getByCategory(categoryId: number): Observable<QuestionResponse> {
    return this.http.get<QuestionResponse>(`${environment.apiUrl}/questions/category/${categoryId}`);
  }

  saveAnswer(data: SaveAnswerRequest): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${environment.apiUrl}/answers`, data);
  }

  getMyAnswers(): Observable<{ answers: any[] }> {
    return this.http.get<{ answers: any[] }>(`${environment.apiUrl}/answers`);
  }

  getProgress(): Observable<{ progress: any }> {
    return this.http.get<{ progress: any }>(`${environment.apiUrl}/answers/progress`);
  }
}
