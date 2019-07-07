import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'myfollowup-his', loadChildren: './myfollowup-his/myfollowup-his.module#MyfollowupHisPageModule' },
  { path: 'followup-details', loadChildren: './followup-details/followup-details.module#FollowupDetailsPageModule' },
  { path: 'payment-his', loadChildren: './payment-his/payment-his.module#PaymentHisPageModule' },
  { path: 'appointment-his', loadChildren: './appointment-his/appointment-his.module#AppointmentHisPageModule' },
  { path: 'doctor-replay', loadChildren: './doctor-replay/doctor-replay.module#DoctorReplayPageModule' },
  { path: 'schedule', loadChildren: './schedule/schedule.module#SchedulePageModule' },
  { path: 'update-schedule', loadChildren: './update-schedule/update-schedule.module#UpdateSchedulePageModule' },
  { path: 'followup-rlist', loadChildren: './followup-rlist/followup-rlist.module#FollowupRlistPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
