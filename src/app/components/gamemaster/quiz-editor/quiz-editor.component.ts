import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-quiz-editor',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './quiz-editor.component.html',
  styleUrl: './quiz-editor.component.scss', // Ensure this matches your file name
})
export class QuizEditorComponent {
  constructor(public dialogRef: MatDialogRef<QuizEditorComponent>) {}

  onSave() {
    // Logic to save will go here; for now, just close
    this.dialogRef.close();
  }
}