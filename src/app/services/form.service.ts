import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  todoForm = new FormGroup({
    'Name': new FormControl(null, [
      Validators.required
    ]),
    'Body': new FormControl(null, [
      Validators.required
    ]),
    'Important': new FormControl(null, [
      Validators.required
    ]),
    'TimeBegin': new FormControl(null, [])
  });
}




