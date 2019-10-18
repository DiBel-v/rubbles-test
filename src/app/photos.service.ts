import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  static API_URL = 'https://api.unsplash.com/photos/?client_id=de005e24b4d532df2ecf43f6ef71ddd4a8b8e9e628027c298dfca0a4cc98bc6d';
  constructor(private http: HttpClient) { }

  getPhotos(): Observable<any> {
    return this.http.get(PhotosService.API_URL);
  }

}
