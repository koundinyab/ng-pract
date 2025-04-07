import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from './interfaces/Post';
import { Jobs } from './interfaces/Job';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  private postsSubject: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>(
    []
  );
  public posts$: Observable<Post[]> = this.postsSubject.asObservable();

  getPosts(): void {
    this.http
      .get<Post[]>(this.baseUrl + '/posts')
      .subscribe((posts) => this.postsSubject.next(posts));
  }

  getPostsPage(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl + '/posts');
  }

  getJobIds(): Observable<number[]> {
    return this.http.get<number[]>(
      'https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty'
    );
  }

  getJobDetails(jobId: number): Observable<Jobs> {
    return this.http.get<Jobs>(
      `https://hacker-news.firebaseio.com/v0/item/${jobId}.json?print=pretty`
    );
  }

  deletePost(postid: number): void {
    this.http.delete(this.baseUrl + `/posts/${postid}`).subscribe((data) => {
      if (data) {
        const latestPosts = this.postsSubject
          .getValue()
          .filter((post: { id: number }) => post.id !== postid);
        this.postsSubject.next(latestPosts);
      }
    });
  }
}
