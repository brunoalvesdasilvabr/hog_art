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
  onTouched!: () => void;
  onChange!: (event: Event) => void;
  writeValue(obj: any): void {
    console.log({ obj });
    this.files = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}
  onClick() {
    if (this.fileUpload) this.fileUpload.nativeElement.click();
  }

  onFileSelected(event: any) {
    this.files = event.target!.files;
    this.onChange(event);
    this.onTouched();
  }

  removeFile(file: FileUploadInterface) {
    console.log(this.files);
    console.log(Object.keys(this.files).filter((el) => console.log({ el })));
    console.log({ file });
  }
}
