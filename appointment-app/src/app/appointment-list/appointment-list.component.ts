import { Component, Inject, Input } from '@angular/core';
import { CommonModule,DOCUMENT } from '@angular/common';
import { Appointment } from '../models/appointment';
import { OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css',
  providers: [CookieService]
})
export class AppointmentListComponent implements OnInit{

appointmentTitle = "";
appointmentDate : Date = new Date();

appointments : Appointment[] = []  
// constructor(private cookieService: CookieService) {}
constructor(@Inject(DOCUMENT) private document: Document) {
}

ngOnInit(): void {
  const localStorage = document.defaultView?.localStorage;
  console.log("line 27",localStorage);
  
  if(localStorage){
    setTimeout(() => {
    console.log(localStorage);
    let savedAppointments = localStorage.getItem("appointments")
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : []
    console.log(this.appointments);
    const savedName = localStorage.getItem('userName');
  },5000);
}

  // let savedAppointments = null;
  // if (typeof localStorage !== 'undefined') {
  //   savedAppointments = localStorage.getItem('appointments');
  // }

  // this.appointments = savedAppointments ? JSON.parse(savedAppointments) : [];

}

addAppointment(){

  if(this.appointmentTitle.trim().length && this.appointmentDate){
    let newAppointment : Appointment ={
      id:Date.now(),
      title:this.appointmentTitle,
      date:this.appointmentDate
    }

    this.appointments.push(newAppointment);

    this.appointmentTitle = "";
    this.appointmentDate = new Date ();

    localStorage.setItem("appointment", JSON.stringify(this.appointments))
  }
}

deleteAppointment(index : number){
  this.appointments.splice(index, 1)
  localStorage.setItem("appointment", JSON.stringify(this.appointments))

}
}
