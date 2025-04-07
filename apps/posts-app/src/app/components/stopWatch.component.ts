import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { interval, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopWatch.component.html',
  styleUrl: './stopwatch.component.less',
  imports: [CommonModule],
})
export class StopwatchComponent implements OnDestroy {
  milliseconds = 0;
  seconds = 0;
  minutes = 0;

  private isRunning = false;
  private stop$ = new Subject<void>();
  private destroy$ = new Subject<void>();

  start() {
    if (this.isRunning) return;
    this.isRunning = true;

    interval(10) // 10ms interval to track milliseconds
      .pipe(
        takeUntil(this.stop$),
        takeUntil(this.destroy$),
        tap(() => this.updateTime())
      )
      .subscribe();
  }

  pause() {
    this.isRunning = false;
    this.stop$.next(); // stops interval
  }

  reset() {
    this.pause();
    this.milliseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
  }

  updateTime() {
    this.milliseconds++;

    if (this.milliseconds >= 100) {
      this.milliseconds = 0;
      this.seconds++;

      if (this.seconds >= 60) {
        this.seconds = 0;
        this.minutes++;
      }
    }
  }

  ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
