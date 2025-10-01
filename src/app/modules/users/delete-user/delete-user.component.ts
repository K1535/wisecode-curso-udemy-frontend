import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent {
  @Output() UserD: EventEmitter<any> = new EventEmitter();
  @Input() USER_SELECTED:any;
  name: String = '';
  isLoading : any;
    
  constructor(
    public modal:NgbActiveModal,
    public rolesService: UsersService,
    public toast: ToastrService,){
    }

  ngOnInit():void {
       
  }
    
  delete(){
    this.rolesService.deleteUser(this.USER_SELECTED.id).subscribe((resp:any)=> {
      console.log(resp)
      if(resp.message == 403){
        this.toast.error('Validacion',resp.message_text);
      }else{
        this.toast.success("Éxito","El usuario se eleminó correctamente");
        this.UserD.emit(resp.role);
        this.modal.close(); 
      }
    })
  }
}