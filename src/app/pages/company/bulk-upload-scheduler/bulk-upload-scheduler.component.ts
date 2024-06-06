import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import ls from 'localstorage-slim';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/core/services/company.service';

import * as XLSX from 'xlsx';
type AOA = any[][];
@Component({
  selector: 'app-bulk-upload-scheduler',
  templateUrl: './bulk-upload-scheduler.component.html',
  styleUrl: './bulk-upload-scheduler.component.scss'
})
export class BulkUploadSchedulerComponent {
  data: AOA = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  uploadSchedule: any = [];
  bulkUploadedSchedule: any = [];
  @Input() clientid: any;

  ngOnInit(): void {
    this.clientid
    debugger
  }

  constructor(
    private router: Router,
    public toastr: ToastrService,
    private companyService: CompanyService,
  ) { }

  backToTable() {
    this.router.navigate(['/clients']);
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
      this.toastr.success('File Uploaded Successfully', 'Uploaded', {
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
    debugger
    this.bulkUploadedSchedule = [];
    this.uploadSchedule
    for (let i = 1; i < this.uploadSchedule.length; i++) {
      // const excelDate = this.uploadSchedule[i][3];
      // // Excel's date system starts from 1900-01-01, but 1900 is treated as a leap year by mistake
      // const date = new Date(Math.round((excelDate - 25569) * 86400 * 1000));
      // const formattedDate = date.toISOString().slice(0, 10); // Extract YYYY-MM-DD from ISO string
      let data = {
        clientid: this.clientid,
        managerid: this.uploadSchedule[i][1],
        designerid: this.uploadSchedule[i][2],
        date: this.uploadSchedule[i][3],
        title: this.uploadSchedule[i][4],
        description: this.uploadSchedule[i][5],
      }
      this.bulkUploadedSchedule.push(data);
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
  // export(): void {
  //   /* generate worksheet */
  //   const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

  //   /* generate workbook and add the worksheet */
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //   /* save to file */
  //   XLSX.writeFile(wb, this.fileName);
  // }
}
