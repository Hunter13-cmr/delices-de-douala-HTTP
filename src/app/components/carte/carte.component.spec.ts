import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarteComponent } from './carte.component';
import { MenuService } from '../../services/menu.service';
import { Plat } from '../../models/plat';

describe('CarteComponent', () => {
  let component: CarteComponent;
  let fixture: ComponentFixture<CarteComponent>;
  let menuService: MenuService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarteComponent],
      providers: [MenuService],
    }).compileComponents();

    fixture = TestBed.createComponent(CarteComponent);
    component = fixture.componentInstance;
    menuService = TestBed.inject(MenuService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have categories initialized', () => {
    const expectedCategories = ['Toutes', 'Plats', 'Grillades', 'Végétarien', 'Boissons'];
    expect(component.categories()).toEqual(expectedCategories);
  });

  it('should change selected category', () => {
    component.selectCategory('Plats');
    expect(component.selectedCategory()).toBe('Plats');
  });

  it('should reset filters and search', () => {
    component.searchQuery.set('test');
    component.selectedCategory.set('Plats');
    component.resetFilters();
    expect(component.selectedCategory()).toBe('Toutes');
    expect(component.searchQuery()).toBe('');
  });
});
