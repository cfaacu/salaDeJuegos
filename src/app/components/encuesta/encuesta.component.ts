import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
})
export class EncuestaComponent {
  encuestaForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private storageService: StorageService, public auth: AuthService) {
    this.encuestaForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{1,10}$')]],
      pregunta1: ['', Validators.required],
      pregunta2: ['', Validators.required],
      pregunta3: ['', Validators.required]
    });
  }

  get f() {
    return this.encuestaForm.controls as any;
  }

  async onSubmit() {
    this.submitted = true;
  
    if (this.encuestaForm.invalid) {
      return;
    }
  
    const usuarioId = this.auth.usuario ? this.auth.usuario.uid : null;
    if (!usuarioId) {
      console.error('El usuario no está autenticado');
      return; 
    }
  
    const datosEncuesta = {
      ...this.encuestaForm.value,
      usuarioId 
    };
  
    try {
      await this.storageService.saveDocNoId(datosEncuesta, 'encuestas');
      console.log('Encuesta guardada con éxito');
  
      await Swal.fire({
        title: 'Éxito!',
        text: 'La encuesta se envió correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
  
      this.encuestaForm.reset();
      this.submitted = false;
    } catch (error) {
      console.error('Error al guardar la encuesta: ', error);
      
      await Swal.fire({
        title: 'Error!',
        text: 'Ocurrió un problema al enviar la encuesta.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
  
  
}
