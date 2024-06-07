import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/core/services/company.service';

import * as XLSX from 'xlsx';
type AOA = any[][];
@Component({
  selector: 'app-bulk-upload-scheduler',
  templateUrl: './bulk-upload-scheduler.component.html',
  styleUrl: './bulk-upload-scheduler.component.scss'
})
export class BulkUploadSchedulerComponent implements OnInit {
  data: AOA = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  uploadSchedule: any = [];
  bulkUploadedSchedule: any = [];
  employeeData: any = [];
  @Input() clientid: any;

  constructor(
    private router: Router,
    public toastr: ToastrService,
    private companyService: CompanyService,
  ) {
    this.getStaffDetails();
  }

  ngOnInit(): void {
    this.clientid
  }
  backToTable() {
    this.router.navigate(['/clients']);
  }
  getStaffDetails() {
    this.companyService.getEmployeeDetailsData().subscribe((res: any) => {
      this.employeeData = res;
      debugger
    })
  }
  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log("data:", this.data);
      this.uploadSchedule = this.data;
      this.toastr.success('File uploaded Successfully', 'Success', {
        timeOut: 3000,
      });
      this.saveBulkSchedule();
      this.data.map(res => {
        if (res[0] === "no") {
          console.log(res[0]);
        } else {
          console.log(res[0]);
        }
      })
    };
    reader.readAsBinaryString(target.files[0]);
  }

  saveBulkSchedule() {
    this.bulkUploadedSchedule = [];
    this.uploadSchedule
    for (let i = 1; i < this.uploadSchedule.length; i++) {
      let managerName = this.uploadSchedule[i][0].toLowerCase(); // Convert manager name to lowercase
      let designerName = this.uploadSchedule[i][1].toLowerCase(); // Convert designer name to lowercase
      let managerId = null;
      let designerId = null;

      // Find the manager's ID based on their lowercase name
      for (let j = 0; j < this.employeeData.length; j++) {
        if (this.employeeData[j].name.toLowerCase() === managerName) {
          managerId = this.employeeData[j].id;
        }
        if (this.employeeData[j].name.toLowerCase() === designerName) {
          designerId = this.employeeData[j].id;
        }
        if (managerId && designerId) {
          break; // Exit the loop once both IDs are found
        }
      }

      if (managerId && designerId) {
        let excelDate = this.uploadSchedule[i][2];
        let jsDate = new Date((excelDate - (25567 + 1)) * 86400 * 1000 - (1 * 86400 * 1000)); // Convert Excel date to JavaScript date and subtract 1 day

        let year = jsDate.getFullYear();
        let month = String(jsDate.getMonth() + 1).padStart(2, '0');
        let day = String(jsDate.getDate()).padStart(2, '0');

        let formattedDate = `${year}-${month}-${day}`;

        let data = {
          managerid: managerId,
          designerid: designerId,
          date: formattedDate,
          title: this.uploadSchedule[i][3],
          description: this.uploadSchedule[i][4],
          clientid: this.clientid,
        }

        this.bulkUploadedSchedule.push(data);
      } else {
        console.log(`Manager ID or Designer ID not found for names: ${managerName}, ${designerName}`);
      }
    }
    this.bulkUploadedSchedule
    debugger
    let tempArray: any = [];
    for (let i = 0; i <= (this.bulkUploadedSchedule.length / 300); i++) {
      tempArray = [];
      let lnth = (this.bulkUploadedSchedule.length / 300);

      if (i == 0) {
        tempArray = [];
        tempArray = this.bulkUploadedSchedule.slice(0, 300);

        this.companyService.saveBulkScheduleDetails(tempArray).subscribe((res: any) => {
          this.toastr.success('Schedule details added successfully', 'Success', { timeOut: 3000 });
        })
      } else if (i != (this.bulkUploadedSchedule.length / 300)) {
        tempArray = [];
        let start = i * 300;
        let end = start + 300;
        tempArray = this.bulkUploadedSchedule.slice(start, end);

        this.companyService.saveBulkScheduleDetails(tempArray).subscribe((res: any) => {
          this.toastr.success('Schedule details added successfully', 'Success', { timeOut: 3000 });
        })
      }
      else {
        debugger
        tempArray = [];
        let start = (i - 1) * 300;
        let end = this.bulkUploadedSchedule.length - start;
        tempArray = this.bulkUploadedSchedule.slice(start, end);

        this.companyService.saveBulkScheduleDetails(tempArray).subscribe((res: any) => {
          this.toastr.success('Schedule details added successfully', 'Success', { timeOut: 3000 });
        })
      }

    }

  }
}
