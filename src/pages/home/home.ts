import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  new_task:String = '';
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
    console.log({'id':this.priorityList.length, 'value':this.selectedPriority, 'task_name':this.new_task});
    this.todo.push({'id':this.priorityList.length-1, 'priority':this.selectedPriority, 'task_name':this.new_task, 'done':false});
  }
}
