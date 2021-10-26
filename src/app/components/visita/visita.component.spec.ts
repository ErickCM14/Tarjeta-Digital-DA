import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitaComponent } from './visita.component';

describe('VisitaComponent', () => {
  let component: VisitaComponent;
  let fixture: ComponentFixture<VisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
