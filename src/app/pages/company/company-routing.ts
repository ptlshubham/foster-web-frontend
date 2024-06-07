import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { RequestTokensComponent } from './request-tokens/request-tokens.component';
import { ClientsComponent } from './clients/clients.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ProfileComponent } from './profile/profile.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { PostingComponent } from './posting/posting.component';
import { MonthlyWorkComponent } from './monthly-work/monthly-work.component';
import { DailyWorkReportComponent } from './daily-work-report/daily-work-report.component';
import { HelpDeskComponent } from './help-desk/help-desk.component';
import { CesDesignTokenComponent } from './ces-design-token/ces-design-token.component';

const routes: Routes = [
  {
    path: 'employee',
    component: EmployeeComponent
  },
  {
    path: 'request-tokens',
    component: RequestTokensComponent
  },
  {
    path: 'clients',
    component: ClientsComponent
  },
  {
    path: 'todo-list',
    component: TodoListComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'attendance',
    component: AttendanceComponent
  },
  {
    path: 'posting',
    component: PostingComponent
  },
  {
    path: 'monthly-report',
    component: MonthlyWorkComponent
  },
  {
    path: 'daily-report',
    component: DailyWorkReportComponent
  },
  {
    path: 'help-desk',
    component: HelpDeskComponent
  },
  {
    path: 'ces-token',
    component: CesDesignTokenComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CompanyRoutingModule { }
