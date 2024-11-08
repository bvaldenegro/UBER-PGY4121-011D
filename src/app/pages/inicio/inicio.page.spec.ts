import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioPage } from './inicio.page';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { provideHttpClient } from '@angular/common/http';

describe('InicioPage', () => {
  let component: InicioPage;
  let fixture: ComponentFixture<InicioPage>;

  const mock = {
    snapshot:{
      params: { usuario : 'Prueba'}
    }
  }

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers:[{provide: ActivatedRoute, useValue: mock}],
      imports:[AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebaseConfig)]
    })

    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    })

    fixture = TestBed.createComponent(InicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
