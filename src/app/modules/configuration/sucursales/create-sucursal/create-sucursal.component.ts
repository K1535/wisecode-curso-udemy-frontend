import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SucursalService } from '../service/sucursal.service';

@Component({
  selector: 'app-create-sucursal',
  templateUrl: './create-sucursal.component.html',
  styleUrls: ['./create-sucursal.component.scss'],
})
export class CreateSucursalComponent implements OnInit {
  @Output() SucursalC: EventEmitter<any> = new EventEmitter();
  name: string = ''; // Usar 'string' en lugar de 'String'
  address: string = '';
  isLoading: boolean = false; // Usar 'boolean' para isLoading

  constructor(
    public modal: NgbActiveModal,
    public sucursalService: SucursalService,
    public toast: ToastrService
  ) {}

  ngOnInit(): void {
    // Código de inicialización, si es necesario
  }

  store() {
    if (!this.name) {
      this.toast.error('Validación', 'El nombre de la Sucursal es requerido');
      return;
    }

    this.isLoading = true;

    let data = {
      name: this.name,
      addres: this.address,
    };

    this.sucursalService.registerSucursal(data).subscribe({
      next: (resp: any) => {
        if (resp.message == 403) {
          this.toast.error('Validación', resp.message_text);
        } else {
          this.toast.success('Éxito', 'La sucursal se registró correctamente');
          this.SucursalC.emit(resp.sucursal);
          this.modal.close();
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.toast.error('Error', 'Hubo un problema al registrar la sucursal.');
        console.error(err);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
