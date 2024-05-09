import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        animate('10s ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateY(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class AppComponent {
  @ViewChild('fluidRef') fluidRef!: ElementRef;
  questionsAndAnswers: { question: string, answer: string,loading: boolean }[] = [];
  questions: string[] = [
    'Where is the cab?',
    'How much time is needed for the cab to arrive?',
    'What is the estimated fare for the trip?'
  ];  
  slideDownState = 'in';
  title = 'ai';
  chatVisible = false;
    selectedQuestion: string | null = null;
    chatMessages: string[] = [];
    loading = false;
    answer: string = '';
    inputQuestion: string = '';



  selectQuestion(question: string) {
    this.selectedQuestion = question;
    // this.chatMessages.unshift(question);
    //   this.closeBox(); 
    this.addQuestionToChat();    // this.generateAnswer();
    this.closeBox();
  }

  addQuestionFromInput(questionText: string) {
    if (questionText.trim() !== '') {
      this.selectedQuestion = questionText;
      this.addQuestionToChat();
    }
  }

  addQuestionToChat() {
    this.loading = true;
    setTimeout(() => {
      const answer = this.getAnswerForQuestion(this.selectedQuestion || '');
      this.questionsAndAnswers.unshift({ question: this.selectedQuestion || '', answer, loading: true });
      this.loading = false;
    }); // Simulate loading with a 2-second delay
  }
  
  

  // generateAnswer() {
  //   setTimeout(() => {
  //     this.answer = this.getAnswerForQuestion(this.selectedQuestion || '');
  //     this.questionsAndAnswers.unshift({ question: this.selectedQuestion || '', answer : this.answer,loading: true});
  //     this.loading = false;
  //   } ); 
  // }

  generateAnswer() {
   const inputQuestion = (document.getElementById('inputQuestion') as HTMLInputElement).value;
    this.addQuestionFromInput(inputQuestion);

  }

  
  getAnswerForQuestion(question: string): string {
    // Simulated answers for demonstration
    switch (question) {
      case 'Where is the cab?':
        return 'The cab is currently en route to your location.';
      case 'How much time is needed for the cab to arrive?':
        return 'The estimated time of arrival is approximately 15 minutes.';
      case 'What is the estimated fare for the trip?':
        return 'The estimated fare for the trip is $20.';
      default:
        return 'Sorry, I am not able to provide an answer at the moment.';
    }
  }

  
  toggleChat() {
    this.chatVisible =true;
  }

  onQuestionSelected(question: string) {
    this.selectedQuestion = question;
  }


  closeBox(){
    this.chatVisible=false;
  }
  selectedColor: string = '#ffffff';
  changeColor() {
    if (this.fluidRef) {
      this.fluidRef.nativeElement.style.backgroundColor = this.selectedColor;
    }  }

}
