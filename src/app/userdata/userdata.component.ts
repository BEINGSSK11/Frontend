import { CommonModule, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { OnlyNumbersDirective } from './number.directive';

@Component({
  selector: 'app-userdata',
  imports: [TitleCasePipe, CommonModule, OnlyNumbersDirective],
  templateUrl: './userdata.component.html',
  styleUrl: './userdata.component.css'
})
export class UserdataComponent {
  todayCalendar = new Date();
  todayDay = this.todayCalendar.toLocaleDateString('en-US', { weekday: 'long' });;
  todayDate = this.todayCalendar.getDate();
  msg: string = `good Morning. it's ${this.todayDay}`;
  trigger: boolean = false;

  userdata: any = [{
    id: 1,
    name: 'rahul sharma',
    role: 'Senior Full Stack Developer',
    email: 'rahul.sharma@example.com',
  },
  {
    id: 2,
    name: 'priya patel',
    role: 'UI/UX Engineer',
    email: 'priya.patel@example.com',
  },
  {
    id: 3,
    name: 'amit verma',
    role: 'Backend Architect',
    email: 'amit.verma@example.com',
  },
  {
    id: 4,
    name: 'sneha reddy',
    role: 'DevOps Engineer',
    email: 'sneha.reddy@example.com',
  }]

  handleDelete(id: number){
    console.log(id)

    this.userdata = this.userdata.filter((u : any)=> id !== u.id)
  }

  trackByUserId(index: number, user: any): number {
    return user.id; // Tell Angular to track elements by their unique 'id'
  }


  ngOnInit() {
    // console.log(this.todayCalendar);
    // console.log(this.todayDay);
    // console.log(this.todayDate);
  }
}
