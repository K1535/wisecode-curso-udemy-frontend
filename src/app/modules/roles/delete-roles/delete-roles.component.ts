import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SIDEBAR } from 'src/app/config/config';
import { RolesService } from '../service/roles.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-roles',
  templateUrl: './delete-roles.component.html',
  styleUrls: ['./delete-roles.component.scss']
})
export class DeleteRolesComponent {
  @Output() RoleD: EventEmitter<any> = new EventEmitter();
  @Input() ROLE_SELECTED:any;
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
    
  delete(){
    this.roleService.deleteRole(this.ROLE_SELECTED.id).subscribe((resp:any)=> {
        console.log(resp)
        if(resp.message == 403){
          this.toast.error('Validacion',resp.message_text);
        }else{
          this.toast.success("Éxito","El rol se eleminó correctamente");
          this.RoleD.emit(resp.role);
          this.modal.close(); 
        }
    })
  }
}
