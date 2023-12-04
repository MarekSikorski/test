import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {

  constructor(private storageService: DataStorageService) {

  }

  onSaveData() {
    this.storageService.storeData();
  }

  onFetchData() {
    this.storageService.fetchData();
  }

}
