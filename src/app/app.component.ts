import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http.service';
import { FormService } from './services/form.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  


  local_task_id: number = 0;
  db_task_id = 0;
  loadTask: boolean = false;
  isEditTask = false;
  taskModal = false;
  time : string = "12.09.17 12:45"
  Oldtasks = [];
  tasks = [];
  todoForm: FormGroup;
  constructor(private http: HttpService, private forms: FormService) { }

  ngOnInit() {
    this.todoForm = this.forms.todoForm;
    this.startLoad();
  }


  startLoad() {
    this.loadTask = true;

    this.http.getAllTask().subscribe(r => {
      for (const task of r.json()) { 
        this.tasks.push(task);
      }
    }, e => {

    }, () => { })
    this.Oldtasks = this.tasks;
  }

  deleteTask(i: number, task: number) {
    this.http.deleteTask(task).subscribe(r => {
      this.tasks.splice(i, 1);
    }, e => { }, () => { })
  }

  setStatus(e: Event, index: number, i: number) {
    const el = (e.target as HTMLInputElement);
    var local_time = el.checked ? new Date().toLocaleString() : null;
    this.http.statusTask(index, el.checked, local_time).subscribe(r => {
      console.log(r.json());
      console.log(local_time);
      this.tasks[i] = r.json();
    }, e => { }, () => { })
  }

  editTask(i: number, id: number) {

    this.taskModal = true;
    this.isEditTask = true;

    this.local_task_id = i;
    this.db_task_id = id;

    this.setTodoFormValue(this.tasks[i]);

  }

  addTask() {

    let n = this.todoForm.get('Name').value;
    let d = this.todoForm.get('Body').value;
    let i = this.todoForm.get('Important').value;
    let finish_time = this.todoForm.get('TimeBegin').value;


    this.http.addTask(n, d, i, finish_time).subscribe(r => {
      this.tasks.push(r.json());
    }, e => { }, () => { });

  }

  submit() {

    if (!this.todoForm.valid) {
      return;
    }

    if (!this.isEditTask) {
      console.log("Добавление задачи!")
      this.addTask();
    }

    if (this.isEditTask) {
      console.log("Обновления задачи!")
      let value = this.getTodoFormValue(this.tasks[this.local_task_id]);
      this.http.updateTask(this.db_task_id, value.n, value.d, value.i, value.finish_time).subscribe(r => {
        this.tasks[this.local_task_id] = r.json();
      }, e => { }, () => { });

      this.isEditTask = false;
    }

    this.taskModal = false;
    this.todoForm.reset();
  }

  getTodoFormValue(task) {

    const values = {
      n: this.todoForm.get('Name').value,
      d: this.todoForm.get('Body').value,
      i : this.todoForm.get('Important').value,
      finish_time: this.todoForm.get('TimeBegin').value
    }

    return values;
  }

  setTodoFormValue(task) {
    this.todoForm.get('Name').setValue(task.Name);
    this.todoForm.get('Body').setValue(task.Description);
    this.todoForm.get('Important').setValue(task.Important);
    this.todoForm.get('TimeBegin').setValue(task.FinishTo);
  }

  timeOver(target_time: string, status: boolean) {

    if(status) return false;
    var c =  new Date().getTime();
    var t = Date.parse(target_time);


    if ((c - t) > 0) {
      return true;
    } else {
      return false;
    }
  }

  sortTask(e: Event) {
    let val = (e.target as HTMLSelectElement).value;
    if (val == '-1'){
      console.log(val == '-1');
      this.tasks = this.Oldtasks;
      return;
    }
    let values = [];
    for (const el of this.Oldtasks) {
      if(el.Important == val) {
        values.push(el);
      }
    }

    this.tasks = values;
  }
}
