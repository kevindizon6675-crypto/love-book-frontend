import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';
import { QuestionService } from '../../services/question.service';
import { Category } from '../../models/category.model';
import { CategoryIconComponent } from '../category-icon/category-icon.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CategoryIconComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  authService = inject(AuthService);
  private categoryService = inject(CategoryService);
  private questionService = inject(QuestionService);
  private router = inject(Router);

  categories = signal<Category[]>([]);
  overallProgress = signal<number>(0);
  loading = signal<boolean>(true);
  userName = signal<string>('');
  showWelcomeLetter = signal<boolean>(true);
  answeredQuestions = signal<number>(0);
  totalQuestions = signal<number>(0);
  envelopeOpened = signal<boolean>(false);

  ngOnInit(): void {
    this.userName.set(this.authService.currentUser()?.name || 'Dear');
    this.loadData();
    
    // Check sessionStorage if user closed the envelope this session
    const envelopeClosed = sessionStorage.getItem('welcomeEnvelopeClosed');
    
    // Show welcome letter only if:
    // 1. Not admin
    // 2. Didn't close envelope in this session
    const shouldShowLetter = !this.authService.isAdmin() && !envelopeClosed;
    this.showWelcomeLetter.set(shouldShowLetter);
    
    console.log('🌷 Welcome Letter Decision:');
    console.log('  - isAdmin:', this.authService.isAdmin());
    console.log('  - envelopeClosed:', !!envelopeClosed);
    console.log('  - showWelcomeLetter:', shouldShowLetter);
  }

  loadData(): void {
    this.categoryService.getProgress().subscribe({
      next: (response) => {
        // Remove duplicates by category ID
        const uniqueCategories = response.categories.filter((category, index, self) =>
          index === self.findIndex((c) => c.id === category.id)
        );
        this.categories.set(uniqueCategories);
        this.calculateOverallProgress();
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading categories:', err);
        this.loading.set(false);
      }
    });
  }

  calculateOverallProgress(): void {
    const cats = this.categories();
    if (cats.length === 0) {
      this.overallProgress.set(0);
      this.answeredQuestions.set(0);
      this.totalQuestions.set(0);
      return;
    }
    
    const totalAnswered = cats.reduce((sum, cat) => sum + (cat.answered_questions || 0), 0);
    const totalQuestions = cats.reduce((sum, cat) => sum + (cat.total_questions || 0), 0);
    
    this.answeredQuestions.set(totalAnswered);
    this.totalQuestions.set(totalQuestions);
    
    const percentage = totalQuestions > 0 ? Math.round((totalAnswered / totalQuestions) * 100) : 0;
    this.overallProgress.set(percentage);
  }

  getCategoryPercentage(category: Category): number {
    const total = category.total_questions || 0;
    const answered = category.answered_questions || 0;
    return total > 0 ? Math.round((answered / total) * 100) : 0;
  }

  getCompletionMessage(categoryName: string): string {
    const messages: {[key: string]: string} = {
      'About Me': 'Thank you for sharing a little more about yourself. Every answer helps me understand the person behind the words.',
      'Favorites': 'Now I know a little more about the things you love. It\'s nice discovering the little things that make you, you.',
      'Interests': 'I\'m glad you shared the things that keep you interested. Maybe someday, I\'ll get to experience some of them with you.',
      'Personality': 'Getting to know your personality makes this feel a little more personal. Thank you for letting me see another side of you.',
      'Love': 'Thank you for sharing how you see love. It\'s nice to know what your heart values and what makes you feel cared for.',
      'About Us': 'These answers mean a little more to me. Thank you for sharing the moments, thoughts, and feelings you have about us.',
      'Dreams': 'I hope you get to experience the things you dream about. Maybe some of those dreams will become memories we get to share someday.',
      'Random Questions': 'And now I know some of the random things that make you, you. Thanks for answering—even the silly ones.',
      'Messages for Kevs': 'Thank you for your message. It means a lot to me.'
    };
    return messages[categoryName] || 'Thank you for completing this category!';
  }

  navigateToCategory(categoryId: number): void {
    this.router.navigate(['/questionnaire', categoryId]);
  }

  logout(): void {
    sessionStorage.removeItem('welcomeEnvelopeClosed'); // Clear so envelope shows on next login
    this.authService.logout();
  }

  goToAdmin(): void {
    if (this.authService.isAdmin()) {
      this.router.navigate(['/admin']);
    }
  }

  closeWelcomeLetter(): void {
    this.showWelcomeLetter.set(false);
    this.envelopeOpened.set(false);
    // Save to sessionStorage so envelope won't show again during this browsing session
    sessionStorage.setItem('welcomeEnvelopeClosed', 'true');
  }

  openEnvelope(): void {
    this.envelopeOpened.set(true);
  }

  closeEnvelope(): void {
    this.envelopeOpened.set(false);
  }

  showEnvelope(): void {
    sessionStorage.removeItem('welcomeEnvelopeClosed'); // Allow envelope to show
    this.showWelcomeLetter.set(true);
    this.envelopeOpened.set(false);
  }
}
