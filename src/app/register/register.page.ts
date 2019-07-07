import { ApiservicesService } from './../services/apiservices.service';
import { ToastController,AlertController,LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import {NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public states: any[];
  public districts: any[];
  public cities: any[];

  yes:any = 'no';
  isLoading = false;
  public selectedDistricts: any[];

  constructor(public toastController: ToastController,public alertController: AlertController,public loadingController: LoadingController,private apiService: ApiservicesService) {

   }

  ngOnInit() {
  }

  chkbx(){
    if(this.yes == 'yes'){
    
      this.yes = 'no';

    }else if(this.yes == 'no'){

      this.yes='yes';
    }
    // if( this.no== true){
    //   this.yes=true;
    //   this.no=false;
    // }else if( this.no== false){
    //   this.yes=false;
    //   this.no=true;
    // }
  }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      spinner: 'circles',
      message: 'Authenticating ...',
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

  
  register(form: NgForm) {
    this.present();
    let degree_name:any = [
      
        {'name' : form.value.d_name,
        'sort_form':form.value.d_name_s}
      
    ];
      

    let data:any = {

      'first_name' : form.value.first_name,
      'last_name' : form.value.last_name,
      'email' : form.value.email,
      'phone' : form.value.phone,
      'surgeon' : this.yes,
      'surgeon_for' : form.value.surgeon_for,
      'specialist_at' : form.value.specialist_at,
      'current_at':form.value.current_at,
      //'birth_date' : (form.value.birth_date).split('T')[0],
      'degree_name' :  degree_name,
      'doctor_licence_id' : form.value.doctor_licence_id,
      'about' : form.value.about,
      'password' : form.value.password,

    };

    console.log(data);


    this.apiService.register(data).subscribe(
      data => {
        this.dismiss();
        alert(data);
        this.toastController.create({
          message: 'Registation Successfull !',
          duration: 2000
        }).then(a => {
          a.present().then(() => {
        });
      });

        form.reset();
      },
      error => {
        this.dismiss();
        console.log(error);
        this.toastController.create({
          message: 'Faild Something Wrong !',
          duration: 2000
        }).then(a => {
          a.present().then(() => {
        });

      });
        alert(error);
      }
    );
  }

}
