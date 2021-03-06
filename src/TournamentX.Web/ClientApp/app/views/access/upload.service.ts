import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const url = 'api/contacts/upload';

@Injectable()
export class UploadService
{
    constructor(private http: HttpClient) { }

    public upload(files, msg)
    {
    //     // this will be the our resulting map
    //     if (files.length === 0)
    //         return;

    //     const formData = new FormData();

    //     for (let file of files)
    //         formData.append(file.name, file);

    //     const uploadReq = new HttpRequest('POST', url, formData, {
    //         reportProgress: true,
    //     });

    //     this.http.request(uploadReq).subscribe(event =>
    //     {
    //         console.log(event);
    //         //   if (event.type === HttpEventType.UploadProgress)
    //         //     this.progress = Math.round(100 * event.loaded / event.total);
    //         //   else if (event.type === HttpEventType.Response)
    //         //     this.message = event.body.toString();
    //     });
    // }
    const status = {};
    console.log(files);

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('txtFile', file, file.name);
      formData.append('body', msg);

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', url, formData, {
        reportProgress: true
      });

      // create a new progress-subject for every file
      const progress = new Subject<number>();

      // send the http-request and subscribe for progress-updates
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {

          // calculate the progress percentage
          const percentDone = Math.round(100 * event.loaded / event.total);
            console.log(percentDone);
          // pass the percentage into the progress-stream
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {

          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();
        }
      });

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable()
      };
    });

    // return the map of progress.observables
    return status;
    }
}