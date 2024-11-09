import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoDialogComponent } from './turno-dialog.component';

describe('TurnoDialogComponent', () => {
  let component: TurnoDialogComponent;
  let fixture: ComponentFixture<TurnoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
