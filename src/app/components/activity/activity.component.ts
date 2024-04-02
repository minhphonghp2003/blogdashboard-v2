import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { TimelineModule } from 'primeng/timeline';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [TimelineModule,CommonModule],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent implements OnInit {
  events1?: any[];

  ngOnInit(): void {
    this.events1 = [
      { action: 'Ordered', createdAt: '15/10/2020 10:30', icon: PrimeIcons.SHOPPING_CART, color: '#9C27B0', image: 'game-controller.jpg' },
      { action: 'Processing', createdAt: '15/10/2020 14:00', icon: PrimeIcons.COG, color: '#673AB7' },
      { action: ' Shipped p Shipped Shipped ShippedShipped p Shipped Shipped Shipped', createdAt: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800' },
      { action: 'Shipped', createdAt: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800' },
      { action: 'Shipped', createdAt: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800' },
      { action: 'Shipped', createdAt: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800' },
      { action: 'Shipped', createdAt: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800' },
      { action: 'Shipped', createdAt: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800' },
      { action: 'Shipped', createdAt: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800' },
      { action: 'Shipped', createdAt: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800' },
      { action: 'Delivered', createdAt: '16/10/2020 10:00', icon: PrimeIcons.CHECK, color: '#607D8B' }
    ];
  }

}
