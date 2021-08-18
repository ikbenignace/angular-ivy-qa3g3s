import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UploadService } from '../../../services/upload.service';
import { HttpEventType, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @ViewChild("fileUpload") fileUpload: ElementRef; files = [];
  @Input() accessKey: string;
  @Input() form: FormGroup;
  @Input() key: string;
  @Input() folder: string;

  percentCompleted: number;
  uploaded: boolean;
  filename: string;

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
  }

  uploadFile(event) {
    var files: File[] = event.target.files;
    console.log(event)
    const formData = new FormData();
    formData.append("file", files[0]);
    this.uploadService.uploadWithProgress(formData, this.folder, this.accessKey)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentCompleted = Math.round(100 * event.loaded / event.total);
          this.filename = 'Bezig met opladen... ' + this.percentCompleted +'%'
        } else if (event instanceof HttpResponse) {
          this.filename = files[0].name
          this.uploaded = true;
          this.form.get(this.key).patchValue(event.body.filePath);
        }
      });
  }

}
