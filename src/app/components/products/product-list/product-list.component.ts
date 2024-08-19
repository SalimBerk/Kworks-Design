import { Component, Input } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProgressSpinnerModule, CardModule, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  @Input() public menuList: any[];
  @Input() public loading: boolean;
  @Input() receivedFunction: (id?: number) => void;
}
