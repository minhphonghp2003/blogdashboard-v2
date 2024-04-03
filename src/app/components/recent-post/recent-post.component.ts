import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recent-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-post.component.html',
  styleUrl: './recent-post.component.css'
})
export class RecentPostComponent {
  @Input()
  title!: string
  @Input()
  image!: string
  @Input()
  like!: number
  @Input()
  view!: number
  @Input()
  id!: number
}
