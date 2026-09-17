import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { CategoryService } from '../../services/category.service';
import { Question } from '../../models/question.model';
import { Category } from '../../models/category.model';
import { CategoryIconComponent } from '../category-icon/category-icon.component';

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [CommonModule, FormsModule, CategoryIconComponent],
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private questionService = inject(QuestionService);
  private categoryService = inject(CategoryService);

  questions = signal<Question[]>([]);
  currentIndex = signal<number>(0);
  currentAnswer = signal<string>('');
  category = signal<Category | null>(null);
  loading = signal<boolean>(true);
  saving = signal<boolean>(false);
  showCompletionMessage = signal<boolean>(false);
  completionMessage = signal<string>('');

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

  ngOnInit(): void {
    const categoryId = Number(this.route.snapshot.paramMap.get('categoryId'));
    this.loadCategory(categoryId);
    this.loadQuestions(categoryId);
  }

  loadCategory(categoryId: number): void {
    this.categoryService.getById(categoryId).subscribe({
      next: (response) => {
        this.category.set(response.category);
      },
      error: (err) => console.error('Error loading category:', err)
    });
  }

  loadQuestions(categoryId: number): void {
    this.questionService.getAll(categoryId).subscribe({
      next: (response) => {
        this.questions.set(response.questions);
        if (response.questions.length > 0) {
          this.currentAnswer.set(response.questions[0].answer_text || '');
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading questions:', err);
        this.loading.set(false);
      }
    });
  }

  get currentQuestion(): Question | undefined {
    return this.questions()[this.currentIndex()];
  }

  get progress(): number {
    const total = this.questions().length;
    return total > 0 ? ((this.currentIndex() + 1) / total) * 100 : 0;
  }

  getProgress(): number {
    const total = this.questions().length;
    return total > 0 ? Math.round(((this.currentIndex() + 1) / total) * 100) : 0;
  }

  get answeredCount(): number {
    return this.questions().filter(q => q.answer_text).length;
  }

  get isAllAnswered(): boolean {
    return this.answeredCount === this.questions().length && this.questions().length > 0;
  }

  previous(): void {
    if (this.currentIndex() > 0) {
      this.saveCurrentAnswer(() => {
        this.currentIndex.set(this.currentIndex() - 1);
        this.currentAnswer.set(this.questions()[this.currentIndex()].answer_text || '');
      });
    }
  }

  next(): void {
    if (this.currentIndex() < this.questions().length - 1) {
      this.saveCurrentAnswer(() => {
        this.currentIndex.set(this.currentIndex() + 1);
        this.currentAnswer.set(this.questions()[this.currentIndex()].answer_text || '');
      });
    } else {
      this.saveCurrentAnswer(() => {
        if (this.isAllAnswered) {
          const catName = this.category()?.name || '';
          this.completionMessage.set(this.getCompletionMessage(catName));
          this.showCompletionMessage.set(true);
          // Don't auto-navigate - wait for user to click button
        }
      });
    }
  }

  closeCompletionAndReturn(): void {
    this.showCompletionMessage.set(false);
    // Return to dashboard after closing
    this.router.navigate(['/dashboard'], { 
      state: { skipWelcome: true } 
    });
  }

  saveCurrentAnswer(callback?: () => void): void {
    const question = this.currentQuestion;
    if (!question) return;

    const answerText = this.currentAnswer().trim();
    
    // Always save, even if empty (to allow clearing answers)
    this.saving.set(true);
    this.questionService.saveAnswer({
      question_id: question.id,
      answer_text: answerText
    }).subscribe({
      next: () => {
        // Update the question in the array
        const questions = this.questions();
        questions[this.currentIndex()].answer_text = answerText;
        this.questions.set([...questions]);
        
        this.saving.set(false);
        if (callback) callback();
      },
      error: (err) => {
        console.error('Error saving answer:', err);
        this.saving.set(false);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard'], { 
      state: { skipWelcome: true } 
    });
  }
}
