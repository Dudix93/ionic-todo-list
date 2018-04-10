import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  new_task:String = '';
  currentSorting:String = '';
  currentColSorted:String = '';
  selectedPriority:String = 'Low';

  rowsPerPageList:Array<any> = [
    {'id':0, 'value':5, 'name':'5'},
    {'id':1, 'value':10, 'name':'10'},
    {'id':2, 'value':15, 'name':'15'}
  ];

  priorityList:Array<any> = [
    {'id':0, 'value':'Low', 'name':'Low'},
    {'id':1, 'value':'Medium', 'name':'Medium'},
    {'id':2, 'value':'High', 'name':'High'}
  ];

  todo:Array<any> = [
    {task_name:'task1',priority_value:1,priority:'Medium',done:false},
    {task_name:'task2',priority_value:0,priority:'Low',done:true},
    {task_name:'task3',priority_value:2,priority:'High',done:false},
    {task_name:'task4',priority_value:0,priority:'Low',done:false},
    {task_name:'task5',priority_value:0,priority:'Low',done:true},
    {task_name:'task6',priority_value:2,priority:'High',done:false}
  ];
    
  pagesList:Array<number> = [];
  
  rowsPerPage:number = 5;
  firstDisplayedIndex:number = 1;
  lastDisplayedIndex:number = 5;
  currentPage:number = 1;
  pages:number = Math.ceil(this.todo.length/this.rowsPerPage);

  constructor(public navCtrl: NavController,private toastCtrl:ToastController) {
    for(let i=1;i<=this.pages;i++) this.pagesList.push(i);
  }

  updatePages(){
    this.pages = Math.ceil(this.todo.length/this.rowsPerPage);
    this.pagesList = [];
    for(let i=1;i<=this.pages;i++) this.pagesList.push(i);

    this.currentPage = 1;

    this.updateTasksRange();
  }

  updateTasksRange(){
    if(this.currentPage == 1) this.firstDisplayedIndex = 1;
    else this.firstDisplayedIndex = ((this.currentPage-1) * this.rowsPerPage) + 1; 

    if(this.currentPage == this.pages) this.lastDisplayedIndex = this.todo.length;
    else this.lastDisplayedIndex = Number(this.firstDisplayedIndex) + Number(this.rowsPerPage) - 1;
  }

  nextPage(){
    if(this.currentPage != this.pages){
      this.currentPage++;
      this.updateTasksRange();
    }
  }

  prevPage(){
    if(this.currentPage != 1){
      this.currentPage--;
      this.updateTasksRange();
    }
  }

  addNewTask(){
    let valid:boolean = true;

    if(!this.new_task.match(/^([0-9]|[A-Z])/gi)){
      this.showToast("Empty or invalid task name.");
      valid = false;
    }
    else if(this.new_task.length > 25){
      this.showToast("Maximum task name should be 25 characters long.");
      valid = false;
    }
    else if(this.todo.map(function(e) { return e.task_name; }).indexOf(this.new_task) != (-1)){
      this.showToast("Task is already on the list.");
      valid = false;
    }
    else if(valid == true){
      this.todo.push(
      {'id':this.priorityList.length-1,
      'priority_value':this.priorityList.map(function(e) { return e.value; }).indexOf(this.selectedPriority),
      'priority':this.selectedPriority, 
      'task_name':this.new_task, 
      'done':false}
      );
      this.updatePages();
      this.updateTasksRange();
      this.showToast("New task added to the list.");
    }
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

  showToast(message:string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
