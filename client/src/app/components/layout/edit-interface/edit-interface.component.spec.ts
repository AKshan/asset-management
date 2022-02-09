import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInterfaceComponent } from './edit-interface.component';

describe('EditInterfaceComponent', () => {
  let component: EditInterfaceComponent;
  let fixture: ComponentFixture<EditInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInterfaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
