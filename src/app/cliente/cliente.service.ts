import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Cliente } from './cliente';
import { Region } from './region';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlApi: string = "";
  constructor(private http: HttpClient,
              private router: Router) { 
    this.urlApi = `${environment.apiUrl}/api`;
  }


  getClientes():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.urlApi}/clientes`);
  }

  getCliente(id:number):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlApi}/cliente/${id}`).pipe(
      catchError((e:any)=>{
        if(e.status !=401 && e.error.mensaje){
          this.router.navigate(['/clientes']);
          console.log(e.error.mensaje)
        }
        return throwError(()=>e);
      })
    )
  }

  update(cliente:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlApi}/clientes/${cliente.id}`, cliente).pipe(
      catchError((e:any)=>{
        if(e.status ==400){
          return throwError(()=>e);
        }

        console.log(e.erros);
        if(e.erros.mensaje){
          console.log(e.errors.mensaje);          
        }
        return throwError(()=>e);
      })
    )
  }

  delete(id:number): Observable<any>{
    return this.http.delete<any>(`${this.urlApi}/clientes/${id}`).pipe(
      catchError((e:any)=>{
        if(e.erros.mensaje){
          console.log(e.errors.mensaje);          
        }
        return throwError(()=>e);
      })
    )
  }
  
  getRegiones(): Observable<Region[]>{
    return this.http.get<Region[]>(`${this.urlApi}/clientes/regiones`);
  }

  create(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(`${this.urlApi}/clientes`, cliente).pipe(
      map((response: any)=> response.cliente as Cliente),
      catchError((e:any)=>{
        if(e.status ==500){
          return throwError(()=>e);
        }
        if(e.error.errors.mensaje){
          console.log(e.error.errors);          
        }
        return throwError(()=>e);
      })
    )
  }
}
