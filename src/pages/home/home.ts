import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  new_task:String = '';
  currentSorting:String = '';
  currentColSorted:String = '';
  selectedPriority:String = 'medium';
  
  rowsPerPage:number = 5;

  rowsPerPageList:Array<any> = [
    {'id':0, 'value':5, 'name':'5'},
    {'id':1, 'value':10, 'name':'10'},
    {'id':2, 'value':15, 'name':'15'}];

  priorityList:Array<any> = [
    {'id':0, 'value':'low', 'name':'Low'},
    {'id':1, 'value':'medium', 'name':'Medium'},
    {'id':2, 'value':'high', 'name':'High'}];

  todo:Array<any> = [
    {task_name:'task1',priority:'low',done:false},
    {task_name:'task2',priority:'low',done:true},
    {task_name:'task3',priority:'high',done:false},
    {task_name:'task4',priority:'low',done:false},
    {task_name:'task5',priority:'low',done:true},
    {task_name:'task6',priority:'high',done:false}];

  constructor(public navCtrl: NavController) {
  
  }

  addNewTask(){
    this.todo.push({'id':this.priorityList.length-1, 'priority':this.selectedPriority, 'task_name':this.new_task, 'done':false});
  }

  compareValues(key, order='asc') {
    return function(a, b) {
    
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          return 0; 
      }
  
      const valueA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
      const valueB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (valueA > valueB) {
        comparison = 1;
      } else if (valueA < valueB) {
        comparison = -1;
      }
      return (order == 'desc') ? (comparison * -1) : comparison
    };
  }

  sortList(key:string){
    if(this.currentSorting == '' || this.currentSorting == 'desc'){
      this.todo.sort(this.compareValues(key,'asc'));
      this.currentSorting = 'asc';
    }
    else if(this.currentSorting == 'asc'){
      this.todo.sort(this.compareValues(key,'desc'));
      this.currentSorting = 'desc';
    }
    this.currentColSorted = key;
  }
}
