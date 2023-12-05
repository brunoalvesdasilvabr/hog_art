import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ProductInterface,
  SavedProductInterface,
} from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from '../../../shared/services/product/products.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
// import { UploadEvent } from 'primeng/fileupload';
import { Location } from '@angular/common';
import { FileUploadInterface } from 'src/app/shared/interfaces/file-upload.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  product!: ProductInterface;
  createProductForm = new FormGroup({
    title: new FormControl('', Validators.required),
    price: new FormControl(null, Validators.required),
    description: new FormControl('', Validators.required),
    fileUpload: new FormControl<File[]>([], Validators.required),
    category: new FormControl('', Validators.required),
  });
  constructor(
    private productService: ProductsService,
    private toast: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.fillInputFields();
    console.log(this.location.getState());
    console.log(this.router.getCurrentNavigation());
  }
  ngOnInit(): void {
    this.createProductForm.controls.fileUpload.valueChanges.subscribe(
      (fileUpload) => {
        console.log({ fileUpload });
      }
    );
    this.createProductForm.valueChanges.subscribe((res) => {
      console.log({ res });
      this.product = {
        title: res.title!,
        price: res.price!,
        image: this.fileImageToBase64String(res.fileUpload!),
        category: res.category!,
        description: res.description!,
      };
    });
  }

  private fillInputFields() {
    const action = this.route.snapshot.queryParams['action'];
    if (action == 'edit') {
      const product = this.location.getState() as ProductInterface;
      Object.keys(this.createProductForm.controls).forEach((control) => {
        this.createProductForm.controls[
          control as keyof typeof this.createProductForm.controls
        ].setValue(product[control as keyof typeof product] as never);
      });

      this.product = product;
    }
  }
  private fileImageToBase64String(files: File[]): FileUploadInterface[] {
    const UploadedImages: FileUploadInterface[] = [];
    console.log('filess', files);
    Object.keys(files!).forEach((key, i) => {
      const file: File = files![key as keyof typeof files] as File;
      const reader = new FileReader();
      console.log('fileeeee', files[key as keyof typeof files]);
      reader.onload = (e) =>
        UploadedImages.push({
          name: (files[key as keyof typeof files] as File).name,
          image: e.target?.result as string,
        });
      reader.readAsDataURL(file);
    });
    console.log({ UploadedImages });
    return UploadedImages;
  }
  submitByAction(product: SavedProductInterface): Observable<any> {
    const action = this.route.snapshot.queryParams['action'];
    let obs$!: Observable<any>;
    switch (action) {
      case 'edit':
        obs$ = this.productService.editProduct(product);
        break;
      case 'create':
        obs$ = this.productService.createProduct(product);
        break;

      default:
        break;
    }
    return obs$;
  }
  SubmitProduct() {
    if (this.createProductForm.valid) {
      const product = {
        title: this.createProductForm.value.title!,
        price: this.createProductForm.value.price!,
        image: this.createProductForm.value.fileUpload!,
        category: this.createProductForm.value.category!,
        description: this.createProductForm.value.description!,
        id: Date.now().toString(),
      };
      this.submitByAction(product).subscribe((res) => {
        console.log({ res });
        this.toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Sua conta foi Criada com sucesso',
        });
      });
    }
  }
}
