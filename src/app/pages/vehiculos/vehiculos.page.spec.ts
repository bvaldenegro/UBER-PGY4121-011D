import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehiculosPage } from './vehiculos.page';
import { provideHttpClient } from '@angular/common/http';

describe('VehiculosPage', () => {
  let component: VehiculosPage;
  let fixture: ComponentFixture<VehiculosPage>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    })

    fixture = TestBed.createComponent(VehiculosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
