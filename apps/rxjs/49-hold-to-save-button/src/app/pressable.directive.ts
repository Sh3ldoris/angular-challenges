import { Directive, input, output } from '@angular/core';
import {
  animationFrameScheduler,
  filter,
  interval,
  map,
  Subject,
  take,
  takeUntil,
  tap,
} from 'rxjs';

@Directive({
  selector: '[appPressable]',
  host: {
    '(mousedown)': 'startCountDown()',
    '(mouseup)': 'stopCountDown()',
    '(mouseleave)': 'stopCountDown()',
  },
})
export class PressableDirective {
  thresholdMillis = input.required<number>();
  currentProgressPercentage = output<number>();
  actionOnPress = output<void>();

  readonly countDownStopped$ = new Subject<void>();

  startCountDown(): void {
    interval(10, animationFrameScheduler)
      .pipe(
        takeUntil(this.countDownStopped$),
        map((executionNumber) => (executionNumber || 1) * 10),
        tap((timePassedInMs) => {
          const progress = Math.round(
            (timePassedInMs / (this.thresholdMillis() - 1000)) * 100,
          );
          this.currentProgressPercentage.emit(progress);
        }),
        filter(
          (timePassedInMs) => timePassedInMs >= this.thresholdMillis() - 1000,
        ),
        take(1),
      )
      .subscribe(() => this.actionOnPress.emit());
  }

  stopCountDown(): void {
    this.countDownStopped$.next();
    this.currentProgressPercentage.emit(0);
  }
}
