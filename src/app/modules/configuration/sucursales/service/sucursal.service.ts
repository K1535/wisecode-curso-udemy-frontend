import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/modules/auth';

@Injectable({
  providedIn: 'root',
})
export class SucursalService {
  isLoading$: Observable<boolean>;
  private isLoadingSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, public authservice: AuthService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  private getHeaders() {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.authservice.token,
    });
  }

  registerSucursal(data: any) {
    this.isLoadingSubject.next(true);
    return this.http
      .post(URL_SERVICIOS + '/sucursales', data, { headers: this.getHeaders() })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  listSucursales(page = 1, search: string = '') {
    this.isLoadingSubject.next(true);
    const url = `${URL_SERVICIOS}/sucursales?page=${page}&search=${search}`;
    return this.http
      .get(url, { headers: this.getHeaders() })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  updateSucursal(ID_SUCURSAL: string, data: any) {
    this.isLoadingSubject.next(true);
    const url = `${URL_SERVICIOS}/sucursales/${ID_SUCURSAL}`;
    return this.http
      .put(url, data, { headers: this.getHeaders() })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  deleteSucursal(ID_SUCURSAL: string) {
    this.isLoadingSubject.next(true);
    const url = `${URL_SERVICIOS}/sucursales/${ID_SUCURSAL}`;
    return this.http
      .delete(url, { headers: this.getHeaders() })
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }
}
