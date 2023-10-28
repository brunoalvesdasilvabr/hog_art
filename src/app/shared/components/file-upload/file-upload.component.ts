import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { FileUploadInterface } from '../../interfaces/file-upload.interface';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FileUploadComponent,
    },
  ],
})
export class FileUploadComponent implements ControlValueAccessor {
  @Input() label!: string;
  imgSrc!: string;
  @ViewChild('fileUpload')
  fileUpload!: ElementRef;
  files: FileUploadInterface[] = [];

  writeValue(obj: any): void {
    this.files = obj;
    // throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    console.log(this.files);
    console.log({ fn });
    this.onFileSelected = fn;
    // throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }
  onClick(event: Event) {
    if (this.fileUpload) this.fileUpload.nativeElement.click();
  }

  onFileSelected(event: any) {
    // console.log({ event });
    // if (event.target.files.length > 0) {
    //   console.log('aqui', event.target.files);
    //   this.files = event.target.files;
    //   var reader = new FileReader();
    //   reader.onload = (e) => {
    //     console.log({ e });
    //     this.imgSrc = reader.result as string;
    //   };
    //   reader.readAsDataURL(event.target.files[0]);
    // }
  }
  removeFile(event: Event) {}
}
