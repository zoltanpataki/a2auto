import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'numberList'})
export class NumberPipe implements PipeTransform {
  transform(pageNumber, recentPage) : any {
    let res = [];
    for (let i = 1; i <= pageNumber; i++) {
      if (i === 1 ||
        i === pageNumber ||
        i === recentPage ||
        i === recentPage - 1 ||
        i === recentPage + 1 ||
        i === recentPage - 2 && recentPage === pageNumber ||
        i === recentPage - 3 && recentPage === pageNumber ||
        i === recentPage - 2 && recentPage === pageNumber - 1 ||
        i === recentPage + 2 && recentPage === 1 ||
        i === recentPage + 2 && recentPage === 2 ||
        i === recentPage + 3 && recentPage === 1 ) {
        res.push(i);
      }
    }
    return res;
  }
}
