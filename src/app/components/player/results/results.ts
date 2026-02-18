import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { QuizService } from '../../../services/quiz';
import { MaterialModule } from '../../../material.module';
import { Subscription } from 'rxjs';
import { LeaderboardWebSocketService } from '../../../services/leaderboard-websocket.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './results.html',
  styleUrl: './results.scss'
})
export class Results implements OnInit {
  resultData: any;
  leaderboard: any[] = [];
    private wsSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute, 
    private quizService: QuizService,
        private websocketService: LeaderboardWebSocketService
  ) {}


 ngOnInit(): void {

  const idParam = this.route.snapshot.paramMap.get('id');

  if (idParam) {
    const id = Number(idParam);

    // 1️⃣ Fetch individual result
    this.quizService.getResultById(id).subscribe({
      next: (data: any) => {
        this.resultData = data;
      },
      error: (err: any) => console.error('Error fetching individual result', err)
    });

    // 2️⃣ Fetch initial leaderboard (VERY IMPORTANT)
    this.quizService.getLeaderboard().subscribe({
      next: (data: any[]) => {
        this.leaderboard = data;
      },
      error: (err: any) => console.error('Error fetching leaderboard', err)
    });

    // 3️⃣ Connect to WebSocket
    this.websocketService.connect();

    // 4️⃣ Listen for live updates
    this.wsSubscription = this.websocketService.leaderboard$
      .subscribe(data => {
        if (data && data.length > 0) {
          this.leaderboard = data;
        }
      });
  }
}


  ngOnDestroy(): void {
    if (this.wsSubscription) {
      this.wsSubscription.unsubscribe();
    }
    this.websocketService.disconnect();
  }
}

