import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from './../services/apiservices.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-payment-his',
  templateUrl: './payment-his.page.html',
  styleUrls: ['./payment-his.page.scss'],
})
export class PaymentHisPage implements OnInit {

  payment:any;
  appoint:any;
  doc_id:any;

  constructor(private storage: Storage,private apiService: ApiservicesService) { }

  async ngOnInit() {

    await this.storage.get('user_info').then(async (data) =>{
      this.doc_id = await data.user_info[0].id;
    })

    //  this.apiService.paymentHis(this.doc_id).subscribe(
    //   data => {

    //     console.log(data);
    //     this.payment = data;
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );

  }

}
