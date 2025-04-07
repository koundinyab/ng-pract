import { Component, OnDestroy, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { debounceTime, Subject, takeUntil } from "rxjs";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrl: './search.component.less',
    imports: [ReactiveFormsModule]
})

export class SearchComponent implements OnInit, OnDestroy{
    @Output() searchTerm = new EventEmitter<string>();
    searchControl: FormControl = new FormControl('');
    private destroy$ = new Subject<void>();

    ngOnInit(): void {
        this.searchControl.valueChanges.pipe(
            takeUntil(this.destroy$),
            debounceTime(300),
        ).subscribe(searchTerm => {
            this.searchTerm.emit(searchTerm);
        })
    }
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
};