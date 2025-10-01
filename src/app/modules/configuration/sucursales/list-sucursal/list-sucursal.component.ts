import { Component } from '@angular/core';
import { SucursalService } from '../service/sucursal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';




import { SucursalService } from '../service/sucursal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SucursalService } from '../service/sucursal.service';



import { CreateSucursalComponent } from '../create-sucursal/create-sucursal.component';
import { EditSucursalComponent } from '../edit-sucursal/edit-sucursal.component';
import { DeleteSucursalComponent } from '../delete-sucursal/delete-sucursal.component';

@Component({
  selector: 'app-list-sucursal',
  templateUrl: './list-sucursal.component.html',
  styleUrls: ['./list-sucursal.component.scss']
})
export class ListSucursalComponent {

  search:string = '';


  SUCURSALES:any = [];
  isLoading$:any;

  totalPages:number = 0;
  currentPage:number = 1;
  constructor(
    public modalService: NgbModal,
    public sucursalService: SucursalService,
  ) {
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.isLoading$ = this.sucursalService.isLoading$;
    this.listSucursales();
  }

  listSucursales(page = 1){
    this.sucursalService.listSucursales(page,this.search).subscribe((resp:any) => {
      console.log(resp);
      this.SUCURSALES = resp.sucursales;
      this.totalPages = resp.total;
      this.currentPage = page;
    })
  }

  loadPage($event:any){
    this.listSucursales($event);
  }

  createSucursal(){
    const modalRef = this.modalService.open(CreateSucursalComponent,{centered:true, size: 'md'});

    modalRef.componentInstance.SucursalC.subscribe((sucursal:any) => {
      this.SUCURSALES.unshift(sucursal);
    })
  }

  editSucursal(SUCURSAL:any){
    const modalRef = this.modalService.open(EditSucursalComponent,{centered:true, size: 'md'});
    modalRef.componentInstance.SUCURSAL_SELECTED = SUCURSAL;

    modalRef.componentInstance.SucursalE.subscribe((sucursal:any) => {
      let INDEX = this.SUCURSALES.findIndex((sucurs:any) => sucurs.id == SUCURSAL.id);
      if(INDEX != -1){
        this.SUCURSALES[INDEX] = sucursal;
      }
    })
  }

  deleteSurcusal(SUCURSAL:any){
    const modalRef = this.modalService.open(DeleteSucursalComponent,{centered:true, size: 'md'});
    modalRef.componentInstance.SUCURSAL_SELECTED = SUCURSAL;

    modalRef.componentInstance.SucursalD.subscribe((sucursal:any) => {
      let INDEX = this.SUCURSALES.findIndex((sucurs:any) => sucurs.id == SUCURSAL.id);
      if(INDEX != -1){
        this.SUCURSALES.splice(INDEX,1);
      }
      // this.ROLES.unshift(role);
    })
  }

}


    SUCURSALES: any = [];
    isLoading$:any;
    totalPages:number = 0;
    currentPage:number = 0;
    constructor(
      public modalService: NgbModal, 
      public sucursalService:SucursalService,
    ){
      
    }
  
    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngOnInit():void {
      this.isLoading$ = this.sucursalService.isLoading$;
      this.listSucursales();
    }
  
    listSucursales(page = 1){
      this.sucursalService.listSucursales(page,this.search).subscribe((resp:any)=>{
        console.log(resp);
        this.SUCURSALES = resp.sucursales;
        this.totalPages = resp.total;
        this.currentPage = page;
      })
    }
    loadPage($event:any){
      this.listSucursales($event);
    }
  
    createSucursal(){
      const modalRef = this.modalService.open(CreateSucursalComponent, {centered:true, size:'md'});

      modalRef.componentInstance.SucursalC.subscribe((sucursal:any)=>{
        this.SUCURSALES.unshift(sucursal);

      modalRef.componentInstance.RoleC.subscribe((role:any)=>{
        this.SUCURSALES.unshift(role);

      })
    }
    editSucursal(ROL:any){
      const modalRef = this.modalService.open(EditSucursalComponent, {centered:true, size:'md'});
      modalRef.componentInstance.ROLE_SELECTED = ROL;
      modalRef.componentInstance.RoleE.subscribe((role:any)=>{
        let INDEX = this.SUCURSALES.findIndex((rol:any) => rol.id == ROL.id);
        if(INDEX != -1){
          this.SUCURSALES[INDEX] = role;
        }
      })
    }
    deleteSucursal(ROL:any){
      const modalRef = this.modalService.open(DeleteSucursalComponent, {centered:true, size:'md'});
      modalRef.componentInstance.ROLE_SELECTED = ROL;
      modalRef.componentInstance.RoleD.subscribe((role:any)=>{
        let INDEX = this.SUCURSALES.findIndex((rol:any) => rol.id == ROL.id);
        if(INDEX != -1){
          this.SUCURSALES.splice(INDEX,1);
        }
      })
    }
  }


