import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehiculoPage } from './vehiculo.page';
import { provideHttpClient } from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('VehiculoPage', () => {
  let component: VehiculoPage;
  let fixture: ComponentFixture<VehiculoPage>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
      imports:[AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebaseConfig)]
    })

    fixture = TestBed.createComponent(VehiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
