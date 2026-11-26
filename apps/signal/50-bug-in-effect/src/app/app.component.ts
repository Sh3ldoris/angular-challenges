import {
  ChangeDetectionStrategy,
  Component,
  effect,
  model,
  untracked,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-root',
  template: `
    <section class="flex gap-5">
      <p>MacBook</p>
      <p>1999,99 €</p>
    </section>

    <section>
      <p>Extras:</p>

      <div>
        <input type="checkbox" [(ngModel)]="drive" />
        +500 GB drive-space
      </div>
      <div>
        <input type="checkbox" [(ngModel)]="ram" />
        +4 GB RAM
      </div>
      <div>
        <input type="checkbox" [(ngModel)]="gpu" />
        Better GPU
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  drive = model(false);
  ram = model(false);
  gpu = model(false);

  constructor() {
    /**
     * Explain for your junior team mate why this bug occurs ...
     * EXPLANATION:
     *  - Angular effects use dynamic dependency tracking
     *  - OR condition evaluate just the first true value
     *  - The combination of the first 2 cases: the other falsy values are left outside the effect's registered dependencies
     **/
    // effect(() => {
    //   if (this.drive() || this.ram() || this.gpu()) {
    //     alert('Price increased!');
    //   }
    // });

    /**
     * Fix: Put the signal (dependent values) outside of condition
     **/
    effect(() => {
      const drive = this.drive();
      const ram = this.ram();
      const gpu = this.gpu();
      // Untracked is not necessary, but rather habit in this case
      untracked(() => {
        if (drive || ram || gpu) {
          alert('Price increased!');
        }
      });
    });
  }
}
