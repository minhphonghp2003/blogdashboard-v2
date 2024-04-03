import { Component, Input, OnInit } from '@angular/core';
import { BoxComponent } from '../box/box.component';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [BoxComponent],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.css'
})
export class WidgetComponent implements OnInit {
  @Input()
  image!: string
  @Input()
  title!: string
  @Input()
  value!: string | number
  color?: string
  ngOnInit(): void {
    let ranColor = ["red", "green", "blue", "purple"]
    this.color = ranColor[Math.floor(Math.random() * ranColor.length)]
  }

}
