import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from './../services/apiservices.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { PassdataService } from './../passdata/passdata.service';


@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    userInfo: any;
    doc_id: any;
    docData: Observable<any>;
    searchTerm: string = '';
    followup: any;

    constructor(private storage: Storage, private apiService: ApiservicesService, private router: Router,private passdata:PassdataService) {

        this.getDocdata();

        this.storage.get('user_info').then((data) => {
            console.log(data);
        })
    }

    async ngOnInit() {

        await this.storage.get('user_info').then(async (data) => {
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

    async getDocdata() {
        await this.storage.get('user_info').then(async (data) => {

            this.doc_id = (data.user_info.id);
            this.userInfo = data.user_info[0];

            console.log(this.userInfo);

        })
    }

    followDetails(data) {

        this.passdata.setData('followup_his', data);
        this.passdata.setData('followup_id', data.fu_id);
        this.router.navigateByUrl('/followup-rlist');
    }

    doctorSearch(name) {

        console.log(name);
        this.apiService.doctorSearch(this.searchTerm).subscribe(
            data => {

                console.log(data);
                let dataA: any = [];
                dataA = data;
                this.docData = dataA;
            },
            error => {
                console.log(error);
            }
        );
    }

    doctorDetails(data) {

        this.router.navigateByUrl('/doctor-profile');
    }

    logout() {
        this.storage.clear().then((data) => {
            console.log(data);
        });
        this.router.navigateByUrl('/login');

        // this.apiService.logout().subscribe(
        //   data => {

        //     console.log(data);
        //     this.router.navigateByUrl('/login');
        //   },
        //   error => {
        //     console.log(error);
        //   }
        // );
    }


}
