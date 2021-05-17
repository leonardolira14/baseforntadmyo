import { Component, OnInit } from '@angular/core';
import { GirosServiceService } from '../../../../services/data_company/giros-service.service';
import { Serviecokie } from '../../../../library/servercokie';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EventsServiceService } from '../../../../services/events-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form_data: FormGroup;
  Lista_giros: [];
  Lista_subgiros: any =  [];
  Lista_Ramas: any = [];
  submitt = false;
  data_company = [];
  token = '';
  data_user: [];
  constructor(
    private http_service: EventsServiceService,
    private http: GirosServiceService,
    private cookieService: Serviecokie,
    private formbuild: FormBuilder
  ) {
    
    this.http.Certification$.subscribe(data => {
      this.form_data_edit(data);
    });
    
    this.form_data = this.formbuild.group({
     
      id: [''],
      Giro: ['', Validators.required],
      SubGiro: [''],
      Rama: [''],
      Principal: [false]
    });
   }

  ngOnInit(): void {
    this.getLis();
  }
   // funcon para cargar los giros
   getLis(){
     this.http.getAllGiiro()
     .subscribe(data=>{
      this.Lista_giros = data['giros'];
       console.log(data);
     },(error:HttpErrorResponse)=>{
       console.log(error);
     })
   }
  // funcion para agregar un nuevo giro
  addGiro() {
  
    this.submitt = true;
    
    this.http_service.preloadEvent$.emit(true);
    if (this.form_data.valid) {
      if (this.get_Form_data['id'].value === '') {
        this.http.service_add(this.form_data.value)
          .subscribe(data => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Información registrada',
              showConfirmButton: false,
              timer: 1500
            })
            this.http.NewCertification$.emit(true);
          }, (error: HttpErrorResponse) => {
            alert('algo paso al agregar un giro' + error.error + ' Status: ' + error.status);
          }, () => this.http_service.preloadEvent$.emit(false));
      } else {
        this.http.ngUpdateCerticate(this.form_data.value,this.get_Form_data['id'].value)
          .subscribe(data => {
            Swal.fire('Exito','Giro actualizado','success');
            this.http.NewCertification$.emit(true);
          }, (error: HttpErrorResponse) => {
            Swal.fire('Error','algo paso al actualizar un giro' + error.error + ' Status: ' + error.status,'error');
          }, () => this.http_service.preloadEvent$.emit(false));
      }
      
    }
  }
  get get_Form_data() {
    return this.form_data.controls;
  }
  selectSub() {
    
    this.http_service.preloadEvent$.emit(true);
    this.http.getallsubsector(this.get_Form_data['Giro'].value)
      .subscribe(data => {
        console.log(data);
        this.Lista_subgiros = data['subgiros'];
        if (this.Lista_subgiros.length > 0) {
          this.get_Form_data['SubGiro'].setValidators([Validators.required]);
          this.get_Form_data['SubGiro'].updateValueAndValidity();
        }
      }, (error: HttpErrorResponse) => {
          this.http_service.preloadEvent$.emit(false);
          alert('algo paso ' + error.message + ' Status: ' + error.status);
          console.log(error);
      }, () => this.http_service.preloadEvent$.emit(false));
  }

  Rama() {
   
    this.http_service.preloadEvent$.emit(true);
    this.http.getrama(this.get_Form_data['SubGiro'].value)
      .subscribe(data => {
        console.log(data);
        this.Lista_Ramas = data['ramas'];
        console.log(this.Lista_Ramas);
        if (this.Lista_Ramas.length > 0) {
          this.get_Form_data['Rama'].setValidators([Validators.required]);
          this.get_Form_data['Rama'].updateValueAndValidity();
        }
      }, (error: HttpErrorResponse) => {
        this.http_service.preloadEvent$.emit(false);
        alert('algo paso ' + error.message + ' Status: ' + error.status);
        console.log(error);
      }, () => this.http_service.preloadEvent$.emit(false));
  }

  // funcipnpara poner los datos en el formulario
  form_data_edit(data) {
    console.log(data);
    this.get_Form_data['Giro'].setValue(data['Giro'][0]._id);
    this.get_Form_data['SubGiro'].setValue(data['SubGiro'][0]._id);
    this.selectSub();
    this.get_Form_data['Rama'].setValue(data['Rama'][0]._id);
    this.Rama();
    this.get_Form_data['id'].setValue(data['id']);
    this.get_Form_data['Principal'].setValue(data['Principal']);
  }

}
