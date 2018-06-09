import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const t = value as string;
    if (t == 'null' || t == '' || t == null) return "No time";
    var new_Time = new Date(t).toLocaleString().replace(',', ' ');

    return new_Time;
  }

}
