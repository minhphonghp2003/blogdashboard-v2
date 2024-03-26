import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostInformationComponent } from './post-information.component';

describe('PostInformationComponent', () => {
  let component: PostInformationComponent;
  let fixture: ComponentFixture<PostInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
