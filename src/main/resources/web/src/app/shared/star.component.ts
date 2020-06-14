import { Component, Input, OnChanges,Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'pm-star',
	templateUrl: './star.component.html',
	styles: ['./star.component.css']
})

export class StarComponent implements OnChanges{
	@Input() rating: number;
	starWidth: number;
	@Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

	ngOnChanges(): void {
		this.starWidth = this.rating * 75 / 5;
	}
	onClick() {
	 	this.ratingClicked.emit('Rating ' + this.rating + ' clicked.');
	}
}