import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, take } from 'rxjs';
import { TopicModalComponent } from './topic-dialog.component';
import { TopicService, TopicType } from './topic.service';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="openTopicModal()">Open Topic</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'rxjs-race-condition';
  dialog = inject(MatDialog);
  topicService = inject(TopicService);
  #topics$: Observable<TopicType[]>;

  constructor() {
    this.#topics$ = this.topicService.fakeGetHttpTopic().pipe(take(1));
  }

  // ngOnInit(): void {
  //   // this.topicService
  //   //   .fakeGetHttpTopic()
  //   //   .pipe(take(1))
  //   //   .subscribe((topics) => (this.topics = topics));
  // }

  openTopicModal() {
    this.dialog.open(TopicModalComponent, {
      data: {
        topics$: this.#topics$,
      },
    });
  }
}
