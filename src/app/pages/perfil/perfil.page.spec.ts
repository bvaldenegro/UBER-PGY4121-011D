import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilPage } from './perfil.page';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;

  const mock = {
    snapshot:{
      params: { usuario : 'Prueba'}
    }
  }

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers:[{provide: ActivatedRoute, useValue: mock}]
    })

    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    })

    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Perfil de usuario definido', () => {
    component.cargarUsuario();
    expect(component.usuario).toBeDefined();
  });
  
});
