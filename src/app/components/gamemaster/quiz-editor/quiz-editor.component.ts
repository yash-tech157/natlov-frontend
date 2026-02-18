// import { Component, Inject, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MaterialModule } from '../../../material.module';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms'; // Added Reactive imports

// @Component({
//   selector: 'app-quiz-editor',
//   standalone: true,
//   imports: [CommonModule, MaterialModule, ReactiveFormsModule], // Switched FormsModule to ReactiveFormsModule
//   templateUrl: './quiz-editor.component.html',
//   styleUrl: './quiz-editor.component.scss',
// })
// export class QuizEditorComponent implements OnInit {
//   quizForm!: FormGroup;

//   constructor(
//     private fb: FormBuilder, // Inject FormBuilder
//     public dialogRef: MatDialogRef<QuizEditorComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) {}

//   ngOnInit() {
//     this.initForm();
//     if (this.data) {
//       this.patchExistingData();
//     }
//   }

//   private initForm() {
//     this.quizForm = this.fb.group({
//       title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
//       description: ['', [Validators.required]],
//       questionsList: this.fb.array([]) // Array to hold dynamic questions
//     });
//   }

//   // Getter for easy access to the questions array in HTML
//   get questions() {
//     return this.quizForm.get('questionsList') as FormArray;
//   }

//   // Creates a new question form group with validations
//   createQuestionGroup(qData?: any): FormGroup {
//     return this.fb.group({
//       questionText: [qData?.questionText || '', Validators.required],
//       optionA: [qData?.optionA || '', Validators.required],
//       optionB: [qData?.optionB || '', Validators.required],
//       optionC: [qData?.optionC || '', Validators.required],
//       optionD: [qData?.optionD || '', Validators.required],
//       correctAnswer: [qData?.correctAnswer || '', [Validators.required, Validators.pattern(/^[A-D]$/)]]
//     });
//   }

//   addQuestion() {
//     this.questions.push(this.createQuestionGroup());
//   }

//   removeQuestion(index: number) {
//     this.questions.removeAt(index);
//   }

//   private patchExistingData() {
//     this.quizForm.patchValue({
//       title: this.data.title,
//       description: this.data.description
//     });
    
//     if (this.data.questionsList) {
//       this.data.questionsList.forEach((q: any) => {
//         this.questions.push(this.createQuestionGroup(q));
//       });
//     }
//   }

//   onSave() {
//     if (this.quizForm.valid) {
//       // Structure matches your backend expectations
//       const finalData = {
//         ...this.quizForm.value,
//         questionCount: this.questions.length
//       };
//       this.dialogRef.close(finalData);
//     }
//   }
// }
import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; // Ensure these are imported
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
  quizDescription: string = '';
  questionCount: number = 0;

  questionsList: any[] = [];

  newQuestion = {
    questionText: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: ''
  };

  addQuestionToList() {
    if (this.newQuestion.questionText && this.newQuestion.correctAnswer) {
      this.questionsList.push({ ...this.newQuestion });
      // Reset the form for the next question
      this.newQuestion = { questionText: '', optionA: '', optionB: '', optionC: '', optionD: '', correctAnswer: '' };
    }
  }

  removeQuestion(index: number) {
    this.questionsList.splice(index, 1);
  }
  constructor(
    public dialogRef: MatDialogRef<QuizEditorComponent>, // Fixes Property 'dialogRef' error
    @Inject(MAT_DIALOG_DATA) public data: any           // Fixes Property 'data' error
  ) {}

ngOnInit() {
  if (this.data) {
    this.quizTitle = this.data.title;
    this.quizDescription = this.data.description || '';
    // Load existing questions so they aren't lost on save
    this.questionsList = this.data.questionsList || []; 
    this.questionCount = this.questionsList.length; 
  }
}
onSave() {
  const quizData = {
    title: this.quizTitle,
    description: this.quizDescription,
    questionCount: this.questionsList.length, 
    questionsList: this.questionsList        
  };
  this.dialogRef.close(quizData);
}
}