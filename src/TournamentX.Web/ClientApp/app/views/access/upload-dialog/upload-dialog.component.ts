import { Component, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { HttpService } from '@app/core/services/http.service';
import { UploadService } from '../upload.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'tom-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TomUploadDialogComponent
{
  @ViewChild('file') file;
  public files: Set<File> = new Set();
  // Public
  code: string;
  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;
  message: string;

  /**
   * Constructor
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private route: Router,
    private httpService: HttpService,
    public dialogRef: MatDialogRef<TomUploadDialogComponent>,
    public uploadService: UploadService) 
  {
    // Set the defaults
    this.code;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Verify code and login
   */
  verify(code)
  {
    this.dialogRef.close();
    this.httpService.adminLogin(code)
      .then(() =>
      {
        this.route.navigate(['dashboard']);
      });
  }

  onFilesAdded()
  {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files)
    {
      if (!isNaN(parseInt(key)))
      {
        this.files.add(files[key]);
      }
    }

    console.log(files);
  }

  addFiles()
  {
    this.file.nativeElement.click();
  }

  upload(files)
  {
    this.uploadService.upload(files, this.message);
  }

  closeDialog()
  {
    // if everything was uploaded already, just close the dialog
    if (this.uploadSuccessful)
    {
      return this.dialogRef.close();
    }

    // set the component state to "uploading"
    this.uploading = true;

    // start the upload and save the progress map
    this.progress = this.uploadService.upload(this.files, this.message);

    for (const key in this.progress)
    {
      this.progress[key].progress.subscribe(val => console.log(val));
    }

    // convert the progress map into an array
    let allProgressObservables = [];
    for (let key in this.progress)
    {
      allProgressObservables.push(this.progress[key].progress);
    }

    // Adjust the state variables

    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Finish';

    // The dialog should not be closed while uploading
    this.canBeClosed = false;
    this.dialogRef.disableClose = true;

    // Hide the cancel-button
    this.showCancelButton = false;

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end =>
    {
      // ... the dialog can be closed again...
      this.canBeClosed = true;
      this.dialogRef.disableClose = false;

      // ... the upload was successful...
      this.uploadSuccessful = true;

      // ... and the component is no longer uploading
      this.uploading = false;

      return this.dialogRef.close();
    });


  }
}
