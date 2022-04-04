import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  @Input() icon_name: String;
  @Input() text: String;
  @Input() id_producto: any;  
  @Input() set_icon: boolean = true;  

  constructor() { }

  ngOnInit() {

    // Meter servios
  }

}
