import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsPokemonComponent } from './forms-pokemon.component';

describe('FormsPokemonComponent', () => {
  let component: FormsPokemonComponent;
  let fixture: ComponentFixture<FormsPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsPokemonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
