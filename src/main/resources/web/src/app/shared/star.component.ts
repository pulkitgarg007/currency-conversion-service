import { Component, Input, OnChanges,Output, EventEmitter } from '@angular/core';

@Component({
	selector:'pm-star',
	templateUrl:'./star.component.html',
	styles: ['./star.component.css']
})

export class StarComponent implements OnChanges{
	@Input() rating: number;
	starWidth: number;
	@Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();
	
	ngOnChanges():void {
	console.log('inside'+ this.rating);
		this.starWidth = this.rating * 75 / 5;
		console.log('width'+this.starWidth);
	}
	onClick() {
	 	this.ratingClicked.emit('Rating '+ this.rating +' clicked.');
	}
}