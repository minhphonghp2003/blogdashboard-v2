import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRListsComponent } from './all-rlists.component';

describe('AllRListsComponent', () => {
  let component: AllRListsComponent;
  let fixture: ComponentFixture<AllRListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllRListsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllRListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
