import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class Results implements OnInit, OnDestroy {
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

    // ✅ CHANGED: Only fetch individual result if ID exists
    if (idParam) {
      const id = Number(idParam);
      this.quizService.getResultById(id).subscribe({
        next: (data: any) => {
          this.resultData = data;
        },
        error: (err: any) => console.error('Error fetching individual result', err)
      });
    }

    // ✅ MOVED OUTSIDE: These should run for BOTH the leaderboard route and results route
    this.fetchLeaderboard();
    this.setupWebsocket();
  }

  // Helper to fetch initial leaderboard
  private fetchLeaderboard(): void {
    this.quizService.getLeaderboard().subscribe({
      next: (data: any[]) => {
        this.leaderboard = data;
      },
      error: (err: any) => console.error('Error fetching leaderboard', err)
    });
  }

  // Helper to start real-time updates
  private setupWebsocket(): void {
    this.websocketService.connect();
    this.wsSubscription = this.websocketService.leaderboard$
      .subscribe(data => {
        if (data && data.length > 0) {
          this.leaderboard = data;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.wsSubscription) {
      this.wsSubscription.unsubscribe();
    }
    this.websocketService.disconnect();
  }
}