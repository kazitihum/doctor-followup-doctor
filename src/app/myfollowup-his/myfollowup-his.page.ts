import { PassdataService } from './../passdata/passdata.service';
import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from './../services/apiservices.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myfollowup-his',
  templateUrl: './myfollowup-his.page.html',
  styleUrls: ['./myfollowup-his.page.scss'],
})
export class MyfollowupHisPage implements OnInit {

  followup:any;
  doc_id:any;

  constructor(private router: Router, private storage: Storage,private apiService: ApiservicesService,private passdata:PassdataService) { }

  async ngOnInit() {

    await this.storage.get('user_info').then(async (data) =>{
      this.doc_id = await data.user_info[0].id;
    })

     this.apiService.followupHis(this.doc_id).subscribe(
      data => {

        console.log(data);
        this.followup = data;
      },
      error => {
        console.log(error);
      }
    );

  }

  followDetails(data) {

    this.passdata.setData('followup_his', data);
    this.passdata.setData('followup_id', data.fu_id);
    this.router.navigateByUrl('/followup-rlist');
  }

}
