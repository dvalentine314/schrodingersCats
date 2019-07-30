import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFormDemoComponent } from './template-form-demo.component';

describe('TemplateFormDemoComponent', () => {
  let component: TemplateFormDemoComponent;
  let fixture: ComponentFixture<TemplateFormDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateFormDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateFormDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
