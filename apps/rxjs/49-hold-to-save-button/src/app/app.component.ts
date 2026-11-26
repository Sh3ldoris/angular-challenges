import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PressableDirective } from './pressable.directive';

@Component({
  imports: [PressableDirective],
  selector: 'app-root',
  template: `
    <main class="flex h-screen items-center justify-center">
      <div
        class="flex w-full max-w-screen-sm flex-col items-center gap-y-8 p-4">
        <button
          class="rounded bg-indigo-600 px-4 py-2 font-bold text-white transition-colors ease-in-out hover:bg-indigo-700"
          appPressable
          [thresholdMillis]="3000"
          (actionOnPress)="onSend()"
          (currentProgressPercentage)="progress.set($event)">
          Hold me
        </button>

        <progress [value]="progress()" [max]="100"></progress>
      </div>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  progress = signal<number>(0);

  onSend() {
    console.log('Save it!');
  }
}
