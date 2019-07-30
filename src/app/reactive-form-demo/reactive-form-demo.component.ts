import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reactive-form-demo',
  templateUrl: './reactive-form-demo.component.html',
  styleUrls: ['./reactive-form-demo.component.scss']
})
export class ReactiveFormDemoComponent implements OnChanges {

  @Input() something2Input: string;
  @Output() submitFormEvent = new EventEmitter<string>();
  constructor() { }

  something2: FormControl;

  ngOnChanges() {
    this.something2 = new FormControl(this.something2Input);
  }

  submitForm() {
    this.submitFormEvent.emit(this.something2.value);
  }



}
