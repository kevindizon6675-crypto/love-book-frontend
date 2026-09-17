import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { CategoryIconComponent } from '../category-icon/category-icon.component';

interface UserProgress {
  id: number;
  name: string;
  email: string;
  progress: number;
  answeredQuestions: number;
  totalQuestions: number;
}

interface CategoryProgress {
  id: number;
  name: string;
  icon: string;
  answered_questions: number;
  total_questions: number;
  progress_percentage: number;
}

interface UserAnswer {
  id: number;
  question_text: string;
  answer_text: string;
  category_name: string;
  category_icon: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, CategoryIconComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private router = inject(Router);

  users = signal<UserProgress[]>([]);
  selectedUser = signal<UserProgress | null>(null);
  userAnswers = signal<UserAnswer[]>([]);
  categoryProgress = signal<CategoryProgress[]>([]);
  selectedCategory = signal<number | null>(null);
  loading = signal<boolean>(true);
  loadingAnswers = signal<boolean>(false);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.http.get<{ statistics: { users: UserProgress[] } }>(
      `${environment.apiUrl}/admin/statistics`
    ).subscribe({
      next: (response) => {
        this.users.set(response.statistics.users);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.loading.set(false);
      }
    });
  }

  selectUser(user: UserProgress): void {
    this.selectedUser.set(user);
    this.selectedCategory.set(null);
    this.loadUserAnswers(user.id);
  }

  loadUserAnswers(userId: number, categoryId?: number): void {
    this.loadingAnswers.set(true);
    const url = categoryId 
      ? `${environment.apiUrl}/admin/users/${userId}/answers?category_id=${categoryId}`
      : `${environment.apiUrl}/admin/users/${userId}/answers`;

    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.userAnswers.set(response.questions.filter((q: any) => q.answer_text));
        this.categoryProgress.set(response.categoryProgress);
        this.loadingAnswers.set(false);
      },
      error: (err) => {
        console.error('Error loading answers:', err);
        this.loadingAnswers.set(false);
      }
    });
  }

  filterByCategory(categoryId: number): void {
    if (this.selectedUser()) {
      this.selectedCategory.set(categoryId);
      this.loadUserAnswers(this.selectedUser()!.id, categoryId);
    }
  }

  clearFilter(): void {
    if (this.selectedUser()) {
      this.selectedCategory.set(null);
      this.loadUserAnswers(this.selectedUser()!.id);
    }
  }

  goBack(): void {
    this.selectedUser.set(null);
    this.userAnswers.set([]);
    this.categoryProgress.set([]);
    this.selectedCategory.set(null);
  }

  logout(): void {
    this.authService.logout();
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
