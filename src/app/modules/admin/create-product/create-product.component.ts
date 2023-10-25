import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { FileUploadInterface } from 'src/app/shared/interfaces/file-upload.interface';
import { ProductInterface } from 'src/app/shared/interfaces/product.interface';
// import { UploadEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload!: FileUpload;
  product!: ProductInterface;
  createProductForm = new FormGroup(
    {
      title: new FormControl('', Validators.required),
      price: new FormControl(0, Validators.required),
      description: new FormControl('', Validators.required),
      image: new FormControl<any>('', Validators.required),
      category: new FormControl('', Validators.required),
    },
    { validators: Validators.required }
  );
  constructor(private messageService: MessageService) {}
  ngOnInit(): void {
    this.createProductForm.valueChanges.subscribe((res) => {
      console.log({ res });
      this.product = {
        title: res.title!,
        price: res.price!,
        image: this.convertImageToBase64String(res.image!),
        category: res.category!,
        description: res.description!,
      };
    });
  }

  convertImageToBase64String(filesEvent: any): string[] {
    console.log('Valores', Object.values(filesEvent.target.files));
    const UploadImages: string[] = [];
    Object.keys(filesEvent.target.files).forEach((i) => {
      const file = filesEvent.target.files[i];
      const reader = new FileReader();
      reader.onload = (e) => UploadImages.push(e.target?.result as string);

      reader.readAsDataURL(file);
    });
    console.log({ UploadImages });
    return UploadImages;
  }
  SubmitProduct() {
    console.log(this.createProductForm.value);
  }
}
