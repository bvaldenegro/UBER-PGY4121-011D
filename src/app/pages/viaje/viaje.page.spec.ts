import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViajePage } from './viaje.page';
import { provideHttpClient } from '@angular/common/http';

describe('ViajePage', () => {
  let component: ViajePage;
  let fixture: ComponentFixture<ViajePage>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    })

    fixture = TestBed.createComponent(ViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
