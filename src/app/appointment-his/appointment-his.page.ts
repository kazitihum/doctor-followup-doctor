import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApiservicesService } from './../services/apiservices.service';

@Component({
  selector: 'app-appointment-his',
  templateUrl: './appointment-his.page.html',
  styleUrls: ['./appointment-his.page.scss'],
})
export class AppointmentHisPage implements OnInit {

  doc_id:any;
  appointments:any;

  constructor(private apiService: ApiservicesService,private storage: Storage) { }

  async ngOnInit() {

    await this.storage.get('user_info').then(async (data) =>{
      this.doc_id = await data.user_info[0].id;
      console.log(this.doc_id);
    })

     this.apiService.appointmentHis(this.doc_id).subscribe(
      data => {

        console.log(data);
        this.appointments = data;
      },
      error => {
        console.log(error);
      }
    );


  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }




}
