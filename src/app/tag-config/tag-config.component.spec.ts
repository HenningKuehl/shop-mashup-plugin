import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagConfigComponent } from './tag-config.component';

describe('TagConfigComponent', () => {
  let component: TagConfigComponent;
  let fixture: ComponentFixture<TagConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
