import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRecordsComponent } from './product-records.component';

describe('ProductRecordsComponent', () => {
  let component: ProductRecordsComponent;
  let fixture: ComponentFixture<ProductRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
