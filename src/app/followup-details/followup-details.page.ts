import { Component, OnInit } from '@angular/core';
import { PassdataService } from './../passdata/passdata.service';
import { AlertController,LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { File  } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

@Component({
  selector: 'app-followup-details',
  templateUrl: './followup-details.page.html',
  styleUrls: ['./followup-details.page.scss'],
})
export class FollowupDetailsPage implements OnInit {

  followup:any;
  followupData:any;
  age:any;
  isLoading = false;

  constructor( public alertController: AlertController,public loadingController: LoadingController,private router: Router, private passdata:PassdataService,private transfer: FileTransfer, 
    private file: File) { }

  ngOnInit() {

    this.followup = this.passdata.getData('followup_his');
    this.followupData = this.passdata.getData('followup_data');
    let bdate = new Date(this.followup.patient.birth_date);
    let timeDiff = Math.abs(Date.now() -  bdate.getTime());
    this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    
    console.log(bdate.getTime()+' ',bdate+" ",this.age);
    console.log(this.followup);
    console.log(this.followupData);
    
  }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      spinner: 'circles',
      message: 'File Downloading in "Download" Folder',
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

  replay() {
    this.router.navigateByUrl('/doctor-replay');
  }

  async download(file_name){
    this.present();
    let fileTransfer: FileTransferObject = this.transfer.create();
    await fileTransfer.download(encodeURI('https://flw.pointerror.com/doctor/public/public/uploads/'+file_name),  
    this.file.externalRootDirectory+'/Download/' + file_name).then((entry)=>{
      this.dismiss();
      alert("download Complete");
    },(err)=>{
      this.dismiss();
      alert('faild download');
    });

  }

}
