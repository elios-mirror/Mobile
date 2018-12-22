import { Component, Input } from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: 'loader.html'
})
export class LoaderComponent {

  @Input() color: string;
  constructor() {
  }

}
