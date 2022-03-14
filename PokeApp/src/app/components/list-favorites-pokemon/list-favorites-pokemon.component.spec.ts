import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFavoritesPokemonComponent } from './list-favorites-pokemon.component';

describe('ListFavoritesPokemonComponent', () => {
  let component: ListFavoritesPokemonComponent;
  let fixture: ComponentFixture<ListFavoritesPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFavoritesPokemonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFavoritesPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
