import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	private baseUrl = 'http://localhost:3000/api'; // Adjust your API base URL accordingly

	constructor(private http: HttpClient) {}

	fetchData(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
}
