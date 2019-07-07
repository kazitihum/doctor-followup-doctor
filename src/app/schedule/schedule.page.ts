import { Component, OnInit } from '@angular/core';
import { PassdataService } from './../passdata/passdata.service';
import {NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ApiservicesService } from './../services/apiservices.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  docid:any;
  todayDate:any;
  schedule:Observable<any>;
  
  setStatus:any=0;

  constructor(private router: Router,public actionSheetController: ActionSheetController, private passdata:PassdataService ,private storage:Storage ,public apiService:ApiservicesService) { }

  async ngOnInit() {
    this.todayDate = new Date().toISOString();
    await this.storage.get('user_info').then((data) =>{
      this.docid = data.user_info[0].id;
    })

    this.getSchedule();
    
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  async presentActionSheet(data) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Schedule',
      buttons: [
        {
          text: 'Delete Schedule',
          icon: 'ios-trash',
          handler: () => {
            this.delSchedule(data.id);
          }
        },
        {
        text: 'Update Schedule',
        icon: 'arrow-dropright-circle',
        handler: () => {
          this.storage.set('schedule', data);
          this.router.navigateByUrl('/update-schedule');
          console.log('');
        }
      },{
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  getSchedule(){
    this.apiService.getSchedule(this.docid).subscribe(
      async data => {
        console.log(data);
        this.schedule = data;
      },
      error => {
        console.log(error);
      }
    );
  }
 

  setSchedule(form: NgForm){

    let data = {
      'doctor_id': this.docid,
      'date': (form.value.date).split('T')[0],
      'slot_start': new Date(form.value.slot_start).toLocaleTimeString(),
      'slot_end': new Date(form.value.slot_end).toLocaleTimeString()
    }

    console.log(data);

    this.apiService.setSchedule(data).subscribe(
      data => {
        console.log(data);
        form.reset();
        this.apiService.getSchedule(this.docid).subscribe(
      async data => {
        console.log(data);
        this.schedule = data;
        this.getSchedule();
      },
      error => {
        console.log(error);
      }
    );
      },
      error => {
        console.log(error);
      }
    );

  }

  delSchedule(id){
    this.apiService.delSchedule(id).subscribe(
      data => {
        console.log(data);
        this.getSchedule();
      },
      error => {
        console.log(error);
      }
    );
  }

}
