import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAddressDialogComponent } from './list-address-dialog.component';

describe('ListAddressDialogComponent', () => {
  let component: ListAddressDialogComponent;
  let fixture: ComponentFixture<ListAddressDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAddressDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListAddressDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
