import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  concatMap,
  forkJoin,
  map,
  Observable,
  switchMap,
} from 'rxjs';
import { Post } from '../posts/interfaces/Post';
import { PostService } from '../posts/posts.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Jobs } from '../posts/interfaces/Job';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  imports: [NgIf, NgFor, AsyncPipe],
  styleUrl: './pagination.component.less',
})
export class PagiantionComponent implements OnInit {
  posts$!: Observable<Post[]>;
  paginatedPosts$!: Observable<Post[]>;
  jobSubject = new BehaviorSubject<number[]>([]);
  jobIds$ = this.jobSubject.asObservable();
  jobs$!: Observable<Jobs[]>;
  pageNumber = 1;
  pageSize = 10;
  totalPages!: number[];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getJobIds().subscribe((ids) => this.jobSubject.next(ids));
    this.getJobs();
  }

  getJobs() {
    this.jobs$ = this.jobIds$.pipe(
      map((ids) => {
        this.totalPages = Array.from(
          { length: Math.ceil(ids.length / this.pageSize) },
          (_, i) => i + 1
        );
        console.log(this.totalPages);
        const start = (this.pageNumber - 1) * this.pageSize;
        const end = this.pageNumber * this.pageSize;
        return ids.slice(start, end);
      }),
      switchMap((ids) => {
        const jobReqs = ids.map((id) => {
          return this.postService.getJobDetails(id);
        });

        return forkJoin(jobReqs);
      })
    );
  }

  public handleNextBtnClick(): void {
    this.pageNumber = this.pageNumber + 1;
    this.getJobs();
  }

  public handlePrevBtnClick(): void {
    this.pageNumber = this.pageNumber - 1;
    this.getJobs();
  }

  public goToPage(index: number): void {
    this.pageNumber = index;
    this.getJobs();
  }
}
