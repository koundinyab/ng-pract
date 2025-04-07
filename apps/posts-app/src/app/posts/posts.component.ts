import { Component, OnInit } from "@angular/core";
import { PostService } from "./posts.service";
import { CommonModule } from "@angular/common";
import { map, Observable } from "rxjs";
import { Post } from "./interfaces/Post";
import { SearchComponent } from "../components/search.component";
import { TileComponent } from "../components/tile.component";

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrl: './posts.component.less',
    providers: [PostService],
    imports: [CommonModule, SearchComponent, TileComponent]
})

export class PostsComponent implements OnInit{
    public posts$ !:  Observable<Post[]>;
    public filteredPosts$ !: Observable<Post[]>;
    showDeleteButton = false;

    constructor(private postsService: PostService) {};

    ngOnInit(): void {
        this.posts$ =  this.postsService.posts$;
        this.postsService.getPosts();
        this.filteredPosts$ = this.posts$;
    }

    public deletePost(eventdata: {postId: number, event: MouseEvent}): void {
        const {postId, event} = eventdata;
        event.stopPropagation();
        this.postsService.deletePost(postId);
    }

    public toggleDeleteBtn() {
        this.showDeleteButton = !this.showDeleteButton;
    }

    public filterPostsBySearch(searchTerm: string) {
        this.filteredPosts$ = this.posts$.pipe(
            map(posts => {
                return posts.filter(post => post.title.toLowerCase().includes(searchTerm.trim()));
            })
        )
    }
    
    public check() {
        console.log('clicked');
    }
};