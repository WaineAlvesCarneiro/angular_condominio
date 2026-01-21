// src/app/core/guards/auth-guard.spec.ts

import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthGuard } from './auth-guard';
import { AuthService } from '../services/AuthService';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  const mockUrlTree = {} as UrlTree;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    router = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('deve redirecionar para o login se o usuário não estiver logado', () => {
    router.createUrlTree.and.returnValue(mockUrlTree);
    authService.isLoggedIn.and.returnValue(false);
    
    expect(guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toEqual(mockUrlTree);
  });

  it('deve permitir o acesso se o usuário estiver logado', () => {
    authService.isLoggedIn.and.returnValue(true);
    expect(guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toBe(true);
  });
});