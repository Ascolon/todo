import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UrlsService } from './urls.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: Http, private urls: UrlsService) { }

  getAllTask() {
    return this.http.get(this.urls.AllTask);
  }

  deleteTask(index: number) {
    return this.http.get(`${this.urls.DeleteTask}?id=${index}`);
  }

  statusTask(id: number, status: boolean, time: string) {
    return this.http.get(`${this.urls.TaskStatus}?id=${id}&f=${status}&complete_time=${time}`);
  }

  addTask(n: string, d: string, i: number, finish_time: string = null) {  //string n, string d, int i, string  finish_time = null
    return this.http.get(`${this.urls.AddTask}?n=${n}&d=${d}&i=${i}&finish_time=${finish_time}`);
  }

  updateTask(id: number, n: string, d: string, i: number, finish_time: string = null) { // int id, string n, string d, int i, string finish_time = null
    return this.http
    .get(`${this.urls.UpdateTask}?id=${id}&n=${n}&d=${d}&i=${i}&finish_time=${finish_time}`);
  }
}
