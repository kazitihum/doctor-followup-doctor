import { ApiservicesService } from './../services/apiservices.service';
import { Component, OnInit } from '@angular/core';
import { AlertController,LoadingController } from '@ionic/angular';
import { PassdataService } from './../passdata/passdata.service';
import {NgForm } from '@angular/forms';
import { File ,FileEntry } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-replay',
  templateUrl: './doctor-replay.page.html',
  styleUrls: ['./doctor-replay.page.scss'],
})
export class DoctorReplayPage implements OnInit {

  followup:any;
  isLoading = false;
  fileBuff:any = [];
  filename:any;
  filetype:any;
  docData: any;
  searchTerm: string = '';
  docid:any;
  docName:any;
  patient_id:any;
  flag=0;

  constructor(private router: Router,private passdata:PassdataService, private storage: Storage,public loadingController: LoadingController,private filePath: FilePath,
     private transfer: FileTransfer, private apiService: ApiservicesService,  public alertController: AlertController,
      private file: File, private fileChooser: FileChooser) {
   
   }

   async present(a,b) {
    this.isLoading = true;
    return await this.loadingController.create({
      spinner: 'circles',
      message: 'File Uploading. '+(a+1)+" / " +b,
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

  ngOnInit() {
    this.followup = this.passdata.getData('followup_his');
  }

  chooser() {

    
    this.fileChooser.open().then((uri) => {
      //alert(uri);

      this.filePath.resolveNativePath(uri).then( filePath =>
      {

          let filesPath  = filePath;
          this.filename   =  filesPath.substring(filesPath.lastIndexOf("/") + 1);
          this.filetype   = this.filename.substring(this.filename.lastIndexOf(".") + 1);


          this.file.resolveLocalFilesystemUrl(filePath).then(  fileInfo =>
          {
            let files = fileInfo as FileEntry;
              files.file(success =>
              {
                  this.filetype   = success.type;

                  let fileinfos = {
                    'path': uri,
                    'filename': this.filename,
                    'mmtype': this.filetype,
                  }
          
                  this.fileBuff.push(fileinfos);

                  
              });
          },err =>
          {
            alert(err);
            throw err;
          });

        },err=>
        {
         alert(err);
          throw err;
        });

       

    })
  .catch(e => alert(e));
  }



  async upload(fid,cid){

    const fileTransfer: FileTransferObject = this.transfer.create();
    let success = 0;

    for(let i=0;i<this.fileBuff.length;i++){

     this.present(i,this.fileBuff.length);


      let options: FileUploadOptions = {
        fileKey: 'doc_file',
        fileName: this.fileBuff[i].filename,
        mimeType: this.fileBuff[i].mmtype,
        chunkedMode:false,
        httpMethod: 'post',
        params:{'follow_id' : fid,'doctor_rid': cid}
        
     }

    // alert('Options :  =>'+options);

    // console.log(options);
   
     await fileTransfer.upload(this.fileBuff[i].path, encodeURI('https://flw.pointerror.com/doctor/public/file'), options)
      .then((data) => {
        this.dismiss();
        success=success+1;
        if(success==this.fileBuff.length){
          this.flag=1;
        }
       
      }, (err) => {
        this.dismiss();
        alert(JSON.stringify(err));
      })

    }

  }



   async createFollowup(form: NgForm) {
   
    let data:any = {

      'followup_id' : this.followup.fu_id,
      'child_id' : this.followup.child.cd_id,
      'suggestions' : form.value.suggestions,
      'description' : form.value.description,
      

    };

    this.apiService.docReplay(data).subscribe(
      async data => {

        await console.log(data);
       

        await this.upload(data.followup_id,data.doc_rid);
        this.fileBuff.length = 0;

        form.reset();

        const alert = await this.alertController.create({
          header: 'Success!',
          message: 'Successfully Saved Record !!',
          buttons: [
            {
              text: 'Okay',
              handler: () => {
                this.router.navigateByUrl('/followup-details');
              }
            }
          ]
      });
      await alert.present();

      },
      error => {
        alert(error);
      }
    );

  }

}
