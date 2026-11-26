import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  template: `
    <h1 mat-dialog-title>Show all Topics</h1>
    <div mat-dialog-content>
      <ul>
        @for (topic of topics(); track $index) {
          <li>
            {{ topic }}
          </li>
        }
      </ul>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicModalComponent {
  data = inject(MAT_DIALOG_DATA);
  topics = toSignal(this.data.topics$);
}
