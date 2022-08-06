import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {finalize, Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'smp-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Input() disabled = false;
  @Input() filePath!: string;
  @Input() fileName!: string;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  private selectedFile: File | null = null;
  uploadPercent: Observable<number | undefined> = new Observable<number>();
  downloadUrl: Observable<string> = new Observable<string>();
  uploading = false;
  uploaded = false;

  constructor(private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  openFileSelection() {
    this.fileInput.nativeElement.click();
  }

  selectFile(event: Event) {
    console.log(event.target);
    const target = event.target;
    if (!target) {
      return;
    }

    const fileList = (target as HTMLInputElement).files;
    if (!fileList || fileList.length < 1) {
      return;
    }

    this.selectedFile = fileList.item(0);
    if (!this.selectedFile) {
      return;
    }
    this.pushFileToStorage(this.selectedFile);
  }

  pushFileToStorage(file: File) {
    this.uploading = true;
    const filePath = `${this.filePath}/${this.fileName}.${file.name.split('.').pop()}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);
    uploadTask.snapshotChanges().pipe(finalize(() => {
      this.downloadUrl = fileRef.getDownloadURL();
      this.uploading = false;
      this.uploaded = true;
    })).subscribe();
    this.uploadPercent = uploadTask.percentageChanges();
  }

}
