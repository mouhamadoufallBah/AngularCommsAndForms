import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, output, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { listProducts } from '../../utils/db';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  @Output()
  dataToSend = new EventEmitter();

  addForm!: FormGroup;
  submited = false;


  constructor(private fb: FormBuilder) {
    this.addForm = fb.group({
      nom: ["", [Validators.required, Validators.minLength(3)]],
      prix: ["", [Validators.required, Validators.min(1)]]
    });
  }

  get formElementvalue(): any {
    return this.addForm.controls;
  }

  onSubmit() {
    this.submited = true;

    if (this.addForm.invalid) {
      return;
    }

    this.onAddForm();
  }

  onAddForm(){
    listProducts.push(this.addForm.value);

    this.dataToSend.emit({
      status: true,
      data: this.addForm.value
    })

    this.resetForm();
  }


  resetForm() {
    this.submited = false;
    this.addForm.reset();
  }
}
