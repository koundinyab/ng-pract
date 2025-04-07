import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-suc',
  templateUrl: './sentenceUpdate.Component.html',
  imports: [ReactiveFormsModule],
})
export class SentenceUpdateComponent implements OnInit, OnDestroy {
  inputStringFC!: FormControl;
  outputString = 'test';
  stringsToRemove = ['a', 'an', 'the'];
  destroy$ = new Subject<void>();

  constructor() {
    this.inputStringFC = new FormControl('');
  }

  ngOnInit(): void {
    this.inputStringFC.valueChanges
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe((data) => {
        const dataStringArr = data.trim().split(' ');
        this.outputString = dataStringArr
          .filter((str: string) => !this.stringsToRemove.includes(str))
          .join(' ');
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
