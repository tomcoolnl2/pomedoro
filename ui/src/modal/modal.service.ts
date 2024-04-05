import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ModalService {
	//
	private isVisibleSubject = new BehaviorSubject<boolean>(false);
	isVisible$ = this.isVisibleSubject.asObservable();

	open() {
		this.isVisibleSubject.next(true);
	}

	close() {
		this.isVisibleSubject.next(false);
	}
}
