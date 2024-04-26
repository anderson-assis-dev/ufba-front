import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAddressDialogComponent } from './create-address-dialog.component';

describe('CreateAddressDialogComponent', () => {
  let component: CreateAddressDialogComponent;
  let fixture: ComponentFixture<CreateAddressDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAddressDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAddressDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
