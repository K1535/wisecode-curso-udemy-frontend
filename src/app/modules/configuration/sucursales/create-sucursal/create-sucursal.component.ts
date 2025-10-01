
import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SucursalService } from '../service/sucursal.service';



import { Component, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SIDEBAR } from 'src/app/config/config';
import { RolesService } from 'src/app/modules/roles/service/roles.service';





@Component({
  selector: 'app-create-sucursal',
  templateUrl: './create-sucursal.component.html',
  styleUrls: ['./create-sucursal.component.scss']
})
export class CreateSucursalComponent {


    @Output() SucursalC: EventEmitter<any> = new EventEmitter();
    name: String = '';
    address: string = '';
    isLoading : any;

  
    constructor(
      public modal:NgbActiveModal, 
      public sucursalService: SucursalService, 
      public toast: ToastrService,
    
    ){
       
    }
    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngOnInit():void {
  
 
    }
  
      store(){
      if(!this.name){
      this.toast.error("Validacion", "El nombre de la Sucursal es requerido");
        return false;
    }
   
      let data = {
        name: this.name,
        addres: this.address,
       
      }
      this.sucursalService.registerSucursal(data).subscribe((resp:any)=> {

  @Output() RoleC: EventEmitter<any> = new EventEmitter();
    name: String = '';
    SIDEBAR: any = SIDEBAR;
    isLoading : any;
    permisions : any = [];
  
    constructor(public modal:NgbActiveModal, public roleService: RolesService, public toast: ToastrService,){
       
    }
    ngOnInit():void {
  
    }
    addPermission(permiso:string){
      let INDEX = this.permisions.findIndex((perm:string)=> perm == permiso);
      if (INDEX != -1){
        this.permisions.splice(INDEX,1);
      }else{
        this.permisions.push(permiso);
      }
      console.log(this.permisions);
    }
  
  
    store(){
      if(!this.name){
      this.toast.error("Validacion", "El nombre es requerido");
        return false;
    }
    if(this.permisions.length == 0){
      this.toast.error("Validacion", "Necesitas seleccionar un permiso");
      return false;
    }
      let data = {
        name: this.name,
        permisions: this.permisions,
      }
      this.roleService.registerRole(data).subscribe((resp:any)=> {





          console.log(resp)
          if(resp.message == 403){
            this.toast.error('Validacion',resp.message_text);
          }else{
            this.toast.success("Éxito","La sucursal  se registró correctamente");
            this.SucursalC.emit(resp.sucursal);


            this.toast.success("Éxito","La sucursal  se registró correctamente");
            this.SucursalC.emit(resp.sucursal);


            this.toast.success("Éxito","La sucursal  se registró correctamente");
            this.SucursalC.emit(resp.sucursal);

            this.toast.success("Éxito","La sucursal  se registró correctamente");
            this.SucursalC.emit(resp.sucursal);


            this.toast.success("Éxito","La sucursal  se registró correctamente");
            this.SucursalC.emit(resp.sucursal);

            this.toast.success("Éxito","El rol se registró correctamente");
            this.RoleC.emit(resp.role);


            this.modal.close(); 
          }
      })
  
    }
  }


function Output(): (target: CreateSucursalComponent, propertyKey: "RoleC") => void {
  throw new Error('Function not implemented.');
}

