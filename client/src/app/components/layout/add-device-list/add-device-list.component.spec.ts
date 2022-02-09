import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeviceListComponent } from './add-device-list.component';

describe('AddDeviceListComponent', () => {
  let component: AddDeviceListComponent;
  let fixture: ComponentFixture<AddDeviceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDeviceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeviceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
