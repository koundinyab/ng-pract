import { Component, EventEmitter, Input, Output,  } from "@angular/core";
import { Post } from "../posts/interfaces/Post";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-tile',
    templateUrl: './tile.component.html',
    styleUrl: './tile.component.less',
    imports: [CommonModule]
})

export class TileComponent {
    @Input() tileData: Post | any;
    @Output() deletePost = new EventEmitter<{postId: number, event: MouseEvent}>();
    public showDeleteIcon = false;

    public handleDeleteIconClick (event: MouseEvent): void {
        this.deletePost.emit({postId: this.tileData.id,  event});
    }

    public toggleDeleteBtn(): void {
        this.showDeleteIcon = !this.showDeleteIcon;
    }

};