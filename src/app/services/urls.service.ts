import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  constructor() { }
  adress = "https://cors.io/?http://joycasino-001-site1.ftempurl.com/";
  
  AllTask = `${this.adress}Todo/AllTask`;
  DeleteTask = `${this.adress}Todo/DeleteTask/`;
  TaskStatus = `${this.adress}Todo/TaskStatus/`; // /
  AddTask = `${this.adress}Todo/AddTask`;  // string n, string d, int i, string  finish_time = null
  UpdateTask = `${this.adress}Todo/UpdateTask/`;  // int id, string n, string d, int i, string finish_time = null

}
