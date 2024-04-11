import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManage } from './role-manage-component.component';

describe('RoleManageComponentComponent', () => {
  let component: RoleManage;
  let fixture: ComponentFixture<RoleManage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleManage]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleManage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
