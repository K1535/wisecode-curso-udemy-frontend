import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SIDEBAR } from 'src/app/config/config';
import { RolesService } from '../service/roles.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.scss']
})
export class EditRolesComponent {

    @Output() RoleE: EventEmitter<any> = new EventEmitter();
    @Input() ROLE_SELECTED:any;
    name: String = '';
    SIDEBAR: any = SIDEBAR;
    isLoading : any;
    permisions : any = [];
  
    constructor(public modal:NgbActiveModal, public roleService: RolesService, public toast: ToastrService,){
       
    }
    ngOnInit():void {
      this.name = this.ROLE_SELECTED.name;
      this.permisions =  this.ROLE_SELECTED.permission_pluck;
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
      this.roleService.updateRole(this.ROLE_SELECTED.id,data).subscribe((resp:any)=> {
          console.log(resp)
          if(resp.message == 403){
            this.toast.error('Validacion',resp.message_text);
          }else{
            this.toast.success("Éxito","El rol se editó correctamente");
            this.RoleE.emit(resp.role);
            this.modal.close(); 
          }
      })
  
    }
}
