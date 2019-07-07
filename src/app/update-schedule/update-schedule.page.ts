import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {NgForm } from '@angular/forms';
import { ApiservicesService } from './../services/apiservices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-schedule',
  templateUrl: './update-schedule.page.html',
  styleUrls: ['./update-schedule.page.scss'],
})
export class UpdateSchedulePage implements OnInit {

  docid:any;
  todayDate:any;
  schedule:any;
  date:any;
  start:any;
  end:any;
  sId:any;
  x:any;

  constructor(private router: Router,private storage:Storage ,public apiService:ApiservicesService) { }

  async ngOnInit() {
    this.todayDate = new Date().toISOString();
    await this.storage.get('user_info').then((data) =>{
      this.docid = data.user_info[0].id;
    })
    await this.storage.get('schedule').then((data) =>{
      this.schedule = data;
      this.date =data.date;
      this.start = data.slot_start;
      this.end = data.slot_end;
     
    })
  }

  upch(x){
    console.log(x.value);
  }

  setSchedule(form: NgForm){

    if(form.value.date != ''){
      this.date= (form.value.date).split('T')[0];
    }

    if(form.value.slot_start != ''){
      this.start = new Date(form.value.slot_start).toLocaleTimeString();
    }
    if(form.value.slot_end != ''){ 
      this.end = new Date(form.value.slot_end).toLocaleTimeString();
    }
       

    let data = {
      'doctor_id': this.docid,
      'date': this.date,
      'slot_start': this.start,
      'slot_end': this.end
    }

    console.log(data);

    this.apiService.upSchedule(this.schedule.id,data).subscribe(
      data => {
        alert(data);
        form.reset();
        this.router.navigateByUrl('/schedule');
      },
      error => {
        console.log(error);
      }
    );

  }

}
