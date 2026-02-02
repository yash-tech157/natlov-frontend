import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz-editor',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './quiz-editor.component.html',
  styleUrl: './quiz-editor.component.scss',
})
export class QuizEditorComponent implements OnInit {
  quizTitle: string = '';
  questionCount: number = 0;

  constructor(
    public dialogRef: MatDialogRef<QuizEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Injected data from Dashboard
  ) {}

  ngOnInit() {
    if (this.data) {
      this.quizTitle = this.data.title;
      this.questionCount = this.data.questions;
    }
  }

  onSave() {
    // Return the new data to the dashboard
    this.dialogRef.close({
      title: this.quizTitle,
      questions: this.questionCount
    });
  }
}