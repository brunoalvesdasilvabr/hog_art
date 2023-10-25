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
  product!: ProductInterface;
  createProductForm = new FormGroup({
    title: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
    description: new FormControl('', Validators.required),
    fileUpload: new FormControl<Event>({} as Event, Validators.required),
    category: new FormControl('', Validators.required),
  });
  constructor(private messageService: MessageService) {}
  ngOnInit(): void {
    this.createProductForm.valueChanges.subscribe((res) => {
      console.log(!!res.fileUpload!.target);
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

  private fileImageToBase64String(filesEvent: Event): string[] {
    if (!!filesEvent.target) {
      const UploadedImages: string[] = [];
      const eventTarget = filesEvent.currentTarget as HTMLInputElement;
      Object.keys(eventTarget.files!).forEach((key) => {
        const file: File = eventTarget.files![
          key as keyof typeof eventTarget.files
        ] as File;
        const reader = new FileReader();
        reader.onload = (e) => UploadedImages.push(e.target?.result as string);

        reader.readAsDataURL(file);
      });
      console.log({ UploadedImages });
      return UploadedImages;
    } else {
      return [];
    }
  }
  SubmitProduct() {
    console.log(this.createProductForm.value);
  }
}
