import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HomeService {

    constructor(
        private http: HttpClient
    ) { }
    downloadImage(url: string): Observable<Blob> {
        return this.http.get(url, { responseType: 'blob' }).pipe(
            map(response => new Blob([response]))
        );
    }

}