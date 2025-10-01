import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  @Output() UserE: EventEmitter<any> = new EventEmitter();
  @Input() roles: any = [];
  @Input() USER_SELECTED: any = [];
  
  isLoading : any;

  name: string = '';
  surname: string = '';
  email: string = '';
  phone: string = '';
  role_id: string = '';
  gender: string = '';
  type_document: string = 'DNI';
  n_document: string = '';
  address: string = '';
  file_name: any;
  imagen_previsualizer:any;
  password: string = '';
  password_repeat: string = '';
  constructor(public modal:NgbActiveModal,
  public usersService: UsersService,
  public toast: ToastrService,){
    
  }
  ngOnInit():void {
    this.name = this.USER_SELECTED.name
    this.surname = this.USER_SELECTED.surname
    this.phone = this.USER_SELECTED.phone
    this.email = this.USER_SELECTED.email
    this.gender = this.USER_SELECTED.gender
    this.role_id = this.USER_SELECTED.role_id
    this.n_document = this.USER_SELECTED.n_document
    this.type_document = this.USER_SELECTED.type_document
    this.file_name = this.USER_SELECTED.file_name
    this.address = this.USER_SELECTED.address
    this.imagen_previsualizer = this.USER_SELECTED.avatar
  }

  processFile($event:any){
    if($event.target.files[0].type.indexOf('image') < 0){
      this.toast.warning("Validacion", "El archivo debe ser una imagen");
      return;
    }
    this.file_name = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.file_name);
    reader .onloadend = () => this.imagen_previsualizer = reader.result;
  }

  store(){
    if(!this.name){
      this.toast.error("Validacion", "El nombre es requerido");
      return false;
    }

    if((!this.type_document || !this.n_document)){
      this.toast.error("Validacion", "El requerido el tipo de cocumento junto con el numero del documento");
      return false;
    }

    if(!this.phone){
      this.toast.error("Validacion", "El telefono es requerido");
      return false;
    }

    if(!this.gender){
      this.toast.error("Validacion", "El genero es requerido");
      return false;
    }

    if(!this.role_id){
      this.toast.error("Validacion", "Se requiere un rol");
      return false;
    }

   if(this.password && this.password != this.password_repeat){
      this.toast.error("Validacion", "La contraseñas no coinciden");
      return false;
    } 

  let formData = new FormData();
  formData.append("name", this.name);
  formData.append("surname", this.surname);
  formData.append("email", this.email);
  formData.append("phone", this.phone);
  formData.append("role_id", this.role_id);
  formData.append("gender", this.gender);
  formData.append("type_document", this.type_document);
  formData.append("n_document", this.n_document);
  formData.append("address", this.address);
  if(this.address){
    formData.append("address", this.address);
  }

  if(this.password){
    formData.append("password", this.password);
  }

  if(this.file_name){
    formData.append("imagen", this.file_name);
  }

    this.usersService.updateUser(this.USER_SELECTED.id,formData).subscribe((resp:any)=> {
        console.log(resp)
        if(resp.message == 403){
          this.toast.error('Validacion',resp.message_text);
        }else{
          this.toast.success("Éxito","El usuario se ha editado correctamente");
          this.UserE.emit(resp.user);
          this.modal.close();
        }
    })
  }
}
