import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  userInfo:any;
  doc_id:any;

  constructor(private storage: Storage) {

     this.getDocdata();

  }

  async getDocdata(){
    await this.storage.get('user_info').then(async (data)=>{

 
      this.doc_id =  (data.user_info.id);
      this.userInfo = data.user_info[0];

      console.log(this.userInfo);

     })
  }
 

}
