import { Component, OnInit } from '@angular/core';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  title = 'Clientes';
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes():void{
    this.clienteService.getClientes().subscribe(response=>{
      this.clientes = response;
    })
  }

  delete(cliente: Cliente):void{
    this.clienteService.delete(cliente.id!).subscribe({
      next:()=>{
        this.clientes = this.clientes.filter(cli => cli !== cliente)
      }
    })
  }
}
