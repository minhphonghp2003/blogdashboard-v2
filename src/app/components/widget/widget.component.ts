import { Component } from '@angular/core';
import { BoxComponent } from '../box/box.component';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [BoxComponent],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.css'
})
export class WidgetComponent {

}
