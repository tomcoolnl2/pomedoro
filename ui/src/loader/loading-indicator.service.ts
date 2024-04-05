import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';

@Injectable()
export class LoadingIndicatorService {
	//
	private loadingSubject = new BehaviorSubject<boolean>(false);

	public loading$: Observable<boolean> = this.loadingSubject.asObservable();

	public showLoaderUntilCompleted<T>(
		observable$: Observable<T>
	): Observable<T> {
		return of(null).pipe(
			tap(() => this.show()),
			concatMap(() => observable$),
			finalize(() => this.hide())
		);
	}

	public show() {
		this.loadingSubject.next(true);
	}

	public hide() {
		this.loadingSubject.next(false);
	}
}
