import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { listProducts } from '../../utils/db';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent implements OnInit {
  @Input()
  productToEdit: any = {}
  @Output()
  dataToSend = new EventEmitter();

  submited: boolean = false;
  updateForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.update(this.productToEdit);
  }

  update(eltToEdit: any){
    this.updateForm = this.fb.group({
      nom: [eltToEdit.nom, [Validators.required, Validators.minLength(3)]],
      prix: [eltToEdit.prix, [Validators.required, Validators.min(1)]]
    });
  }

  get formElementvalue(): any {
    return this.updateForm.controls;
  }

  onSubmit(item: any) {
    this.submited = true;

    if (this.updateForm.invalid) {
      return ;
    }

    this.onUpdate(item);
   }

   onUpdate(item: any) {
    let eltToEdit = listProducts.find((elt: any) => elt === item);

    eltToEdit.nom = this.formElementvalue.nom.value
    eltToEdit.prix = this.formElementvalue.prix.value

    this.dataToSend.emit({
      status: true,
      data: this.updateForm
    })
   }

  resetForm() {
    this.updateForm.reset();
    this.submited = false;
  }

}
