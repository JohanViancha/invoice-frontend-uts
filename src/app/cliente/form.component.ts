import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { Region } from './region';
import { ClienteService } from './cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  titulo:string = "";
  actualizar:boolean = false;
  cliente: Cliente = {};
  regiones: Region[] = []
  errores: string[] = [];
  constructor(private clienteService: ClienteService,
              private router: Router,
              private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.getRegiones();
    this.getCargaCliente();
    if(this.actualizar){
      this.titulo = 'Actualizar Cliente';
    }else{
      this.titulo = 'Crear Cliente';
    }

  }

  getRegiones(): void{
    this.clienteService.getRegiones().subscribe(response=>{
      this.regiones = response;
    })
  }

  getCargaCliente():void{
    this.activatedRouter.paramMap.subscribe(params=>{
      let id  = params.get('id');
      if(id){
        this.actualizar = true;
        this.clienteService.getCliente(Number(id)).subscribe(cliente=>{
          this.cliente = cliente;
        })
      }
    })
  }

  create(): void{
    this.clienteService.create(this.cliente).subscribe({
       next: (cliente: Cliente)=>{
          this.router.navigate(['/clientes']);          
       },
       error: (err)=>{
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err);  
       } 
    });    
  }

  update(): void{
    this.clienteService.update(this.cliente).subscribe({
      next: (cliente: Cliente)=>{
         this.router.navigate(['/clientes']);          
      },
      error: (err)=>{
       this.errores = err.error.errors as string[];
       console.error('Código del error desde el backend: ' + err.status);
       console.error(err.error.errors);  
      } 
   });    

  }
  compararRegion(o1: Region, o2: Region): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

}
