import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeInterfaceComponent } from './ae-interface.component';

describe('AeInterfaceComponent', () => {
  let component: AeInterfaceComponent;
  let fixture: ComponentFixture<AeInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AeInterfaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AeInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
