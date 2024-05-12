import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddProductComponent } from '../add-product/add-product.component';
import { UpdateProductComponent } from '../update-product/update-product.component';
import { listProducts } from '../../utils/db';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgxPaginationModule, AddProductComponent, UpdateProductComponent, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  @ViewChild('closseAddModal') closseAddModal!: ElementRef;
  @ViewChild('closeEditModal') closeEditModal !: ElementRef;
  @ViewChild('selectAllCheckbox') selectAllCheckbox!: ElementRef;

  listProduct: any;
  productToEdit: any = undefined;
  list: any;
  selectedProduct: any = undefined;
  p: number = 1;
  filterValue: string = "";
  elementToDelete: any[] = [];

  ngOnInit(): void {
    this.getAllProduct();
  }

  afterAdd(event: any) {
    if (event.status) {
      this.closseAddModal.nativeElement.click();
      this.getAllProduct();
    }
  }

  afterEdit(event: any) {
    if (event.status) {
      this.closeEditModal.nativeElement.click();
      this.listProduct;
      this.getAllProduct();

    }
  }

  getAllProduct() {
    this.listProduct = listProducts.reverse();
    this.onFilter();
  }

  deleteProduct(item: any) {
    const eltToDelete = listProducts.findIndex((elt: any) => elt === item);
    console.log(eltToDelete);
    listProducts.splice(eltToDelete, 1);

    this.getAllProduct();
  }

  getItemToEdit(item: any) {
    this.productToEdit = item
  }

  closeModal() {
    this.productToEdit = undefined
  }

  onFilter() {
    this.list = this.listProduct.filter((elt: any) => {
      const nom = elt.nom.toLowerCase();
      const prix = elt.prix;toString().toLowerCase();
      const filterValue = this.filterValue.toLowerCase();

      return nom.includes(filterValue) || prix.includes(filterValue);
    });
  }

  onAddElementToDeleteList(event: any, item: any) {
    const isChecked = event.target.checked;

    if (isChecked) {
      this.elementToDelete.push(item);
    } else {
      const index = this.elementToDelete.indexOf(item);
      if (index !== -1) {
        this.elementToDelete.splice(index, 1);
      }
    }
  }

  selectAll(event: any) {
    const isChecked = event.target.checked;

    this.listProduct.forEach((item: any) => {
      item.isSelected = isChecked;
      this.onCheckboxChange();
    });
  }

  onCheckboxChange() {
    const allSelected = this.listProduct.every((item: any) => item.isSelected);
    this.selectAllCheckbox.nativeElement.checked = allSelected;

    this.elementToDelete = this.listProduct.filter((item: any) => item.isSelected);
  }

  onDeleteSelected() {
    for (const item of this.elementToDelete) {
      const index = listProducts.findIndex((product: any) => product.id === item.id);

      if (index !== -1) {
        listProducts.splice(index, 1);
      }
    }

    this.elementToDelete = [];
    this.getAllProduct()
  }

}
