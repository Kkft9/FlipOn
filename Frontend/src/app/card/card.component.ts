import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() title: string | undefined;
  @Input() content: string | undefined;
  @Input() price: string | undefined;
  @Input() imageSource: string| undefined;
  @Input() numberOfFullStars:any| undefined;



  constructor() { }

  get fullStars()
  {
    return Array(this.numberOfFullStars);
  }

  get emptyStars()
  {
    var a=5-this.numberOfFullStars
    return Array(a);
  }

  ngOnInit(): void {
  }


}
