import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	//
	public readonly title = 'Pomedoro';

	constructor(private apiService: ApiService) {}

	private dataSubject = new BehaviorSubject<any>(null);

	ngOnInit() {
		this.subscribeToDataChanges();
		this.fetchData();
	}

	fetchData() {
		this.apiService.fetchData().subscribe({
			next: (data) => {
				this.dataSubject.next(data);
			},
			error: (error) => console.error('There was an error!', error),
		});
	}

	subscribeToDataChanges() {
		this.dataSubject.subscribe({
			next: (data) => {
				if (data !== null) {
					console.log('Data has changed:', data);
				}
			},
		});
	}
}
