import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { exhaustMap, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private authService: AuthService) {

  }

  storeData() {
    const data = [];

    data.push({ id: '1', name: 'test1' });
    data.push({ id: '2', name: 'test2' });
    data.push({ id: '3', name: 'test3' });

    this.http.put('https://test-project-17cd8-default-rtdb.europe-west1.firebasedatabase.app/data.json', data).subscribe(response => {
      console.log(response);
    });
  }

  fetchData() {
    this.http.get(
      'https://test-project-17cd8-default-rtdb.europe-west1.firebasedatabase.app/data.json').subscribe(response => {
        console.log(response);
      });
  }
}
