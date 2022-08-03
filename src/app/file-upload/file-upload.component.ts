import { Component, OnInit } from '@angular/core';
import {FirebaseStorage} from "@angular/fire/storage";
import {finalize, Observable} from "rxjs";
import {FileUpload} from "./file-upload";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'smp-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  private selectedFile: File | null = null;
  uploadPercent: Observable<number | undefined> = new Observable<number>();
  downloadUrl: Observable<string> = new Observable<string>();

  constructor(private storage: AngularFireStorage) { }

  ngOnInit(): void {
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
    // TODO
    const mashupId = '';
    const shopId = '';
    const filePath = `shop-mashup-plugin/${mashupId}/${shopId}/icon.${file.name.split('.').pop()}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);
    uploadTask.snapshotChanges().pipe(finalize(() => this.downloadUrl = fileRef.getDownloadURL())).subscribe();
    this.uploadPercent = uploadTask.percentageChanges();
  }

}
