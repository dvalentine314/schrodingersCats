import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-template-form-demo',
  templateUrl: './template-form-demo.component.html',
  styleUrls: ['./template-form-demo.component.scss']
})
export class TemplateFormDemoComponent implements OnInit {

  @Input() something2Input: string;
  @Output() submitFormEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  submitForm() {
    this.submitFormEvent.emit(this.something2Input);
  }
}
