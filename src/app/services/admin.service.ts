import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);

  getAllUsers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/admin/users`);
  }

  getUserAnswers(userId: number, categoryId?: number): Observable<any> {
    const url = categoryId 
      ? `${environment.apiUrl}/admin/users/${userId}/answers?category_id=${categoryId}`
      : `${environment.apiUrl}/admin/users/${userId}/answers`;
    return this.http.get(url);
  }

  getStatistics(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/admin/statistics`);
  }
}
