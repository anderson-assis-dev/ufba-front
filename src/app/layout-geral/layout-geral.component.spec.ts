import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutGeralComponent } from './layout-geral.component';

describe('LayoutGeralComponent', () => {
  let component: LayoutGeralComponent;
  let fixture: ComponentFixture<LayoutGeralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutGeralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
