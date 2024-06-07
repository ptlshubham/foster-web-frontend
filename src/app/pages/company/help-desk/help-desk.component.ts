import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/core/services/company.service';
import { TokensService } from 'src/app/core/services/tokens.service';
import ls from 'localstorage-slim';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-help-desk',
  templateUrl: './help-desk.component.html',
  styleUrl: './help-desk.component.scss'
})
export class HelpDeskComponent {
  submitted = false;
  validationForm!: FormGroup;
  breadCrumbItems!: Array<{}>;
  activeTab: string = 'allTicket';
  ticketModel: any = {};
  public Editor = ClassicEditor;
  HelpList: any = [];
  allTicketsData: any = [];
  isMailOpen: boolean = false;
  isDailyOpen: boolean = false;
  isMarkAsCompleted: any = null;
  paginateData: any[] = []
  employeeList: any = []
  filteredDailyWorkData: any = [];
  dailyWorkData: any = []
  searchClient: any = null;
  emailData!: Array<any>;
  isEditToken: boolean = false;
  openTokenData: any = {};
  emailIds: any[] = [];
  ticket: any = []
  totalRecords = 0;
  startIndex = 1;
  endIndex = 20;
  page = 1;
  pageSize = 20;

  pendingData: any = [];
  processingData: any = [];
  completedData: any = [];
  employeeId: any = localStorage.getItem('Eid');
  role: any = localStorage.getItem('Role');
  constructor(private modalService: NgbModal,
    public formBuilder: UntypedFormBuilder,
    public toastr: ToastrService,
    public tokensService: TokensService,
    private companyService: CompanyService,

  ) {
  }


  ngOnInit(): void {

    this.getAlltickets();
    this.setActiveTab('allTicket');
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Help Desk', active: true }
    ];
    this.validationForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: [''],

    });
    this.isMailOpen = false;

  }
  get f() { return this.validationForm.controls; }

  open(content: any) {
    this.modalService.open(content, { size: 'xl', centered: true });
  }
  setActiveTab(tab: string): void {
    this.emailData = [];
    this.activeTab = tab;
    this.isMailOpen = false;

    if (this.activeTab == 'allTicket') {
      this.getAlltickets();
    }
    else if (this.activeTab == 'pendingTicket') {
      this.emailData = this.pendingData;

      this.getPagintaion();
    }
    else if (this.activeTab == 'processingTicket') {
      this.emailData = this.processingData;
      this.getPagintaion();

    }
    else if (this.activeTab == 'completedTicket') {
      this.emailData = this.completedData;
      this.getPagintaion();

    }
  }

  backToToken() {
    this.isMailOpen = false;
    this.openTokenData = {};

  }
  selectMail(event: any, id: any) {

    if (event.target.checked) {
      let req = {
        id: id,
        status: 'Cancel'
      }
      this.emailIds.push(req);
      if (this.emailIds.length == 1) {
        this.isEditToken = true;
      }
      else {
        this.isEditToken = false;
      }
    } else {
      this.emailIds.splice(this.emailIds.indexOf(id), 1);
      if (this.emailIds.length == 1) {
        this.isEditToken = true;
      }
      else {
        this.isEditToken = false;
      }
    }

  }
  SaveTicketDetails() {
    this.submitted = true;
    this.ticketModel.status = 'Pending';
    if (this.validationForm.invalid) {
      return;
    } else {
      this.ticketModel.employeeid = ls.get('Eid', { decrypt: true });
      this.tokensService.saveHelpTicket(this.ticketModel).subscribe((res: any) => {
        this.allTicketsData = res;
        this.toastr.success('Client Details Successfully Saved.', 'Success', { timeOut: 3000, });
        this.ticketModel = {};
        this.validationForm.markAsUntouched();
        this.modalService.dismissAll();
        this.getAlltickets();
      });
    }
  }


  // getAllTickets() {

  //   this.getAllEmployeeDetails();
  //   this.companyService.getAllDailyList().subscribe((data: any) => {
  //     let filteredData = data;
  //     if (this.isMarkAsCompleted == true) {
  //       filteredData = filteredData.filter((element: any) => element.iscompleted == this.isMarkAsCompleted);
  //     }
  //     if (this.isMarkAsCompleted == false) {
  //       filteredData = filteredData.filter((element: any) => element.iscompleted == this.isMarkAsCompleted);
  //     }


  //   });

  // }
  getAlltickets() {
    this.tokensService.getAllHelpTicket().subscribe((data: any) => {
      if (this.role == 'companyAdmin') {
        this.allTicketsData = data;
      }
      else {
        this.allTicketsData = data.filter((element: any) => element.eid == this.employeeId);
      }
      this.updateDerivedData();
    })
  }

  changeStatusById(id: any, status: any) {
    let data = {
      id: id,
      status: status,
      isStateUpdate: true
    }
    this.tokensService.updateHelpTicketStatus(data).subscribe((res: any) => {
      this.openTokenData.status = res;
      this.openTokenEmailDetails(data);
      this.getAlltickets();

    });
  }
  deleteToken() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.deleteMail();
        Swal.fire('Deleted!', 'Mail has been deleted.', 'success');
      }
    });
  }
  deleteMail() {
    const found = this.emailData.some(r => this.emailIds.indexOf(r.id) >= 0);
    if (found) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.emailIds.length; i++) {
        const obj: any = this.emailData.find(o => o.id === this.emailIds[i]);
        this.emailData.splice(this.emailData.indexOf(obj), 1);
      }
    }
    this.emailIds = [];
  }

  updateDerivedData() {
    this.pendingData = this.allTicketsData.filter((token: any) => token.status === 'Pending');
    this.processingData = this.allTicketsData.filter((token: any) => token.status === 'Processing');
    this.completedData = this.allTicketsData.filter((token: any) => token.status === 'Completed');

    this.emailData = this.allTicketsData;
    this.totalRecords = this.allTicketsData.length;
    this.allTicketsData.forEach((token: { index: any; }, index: number) => token.index = index + 1);
    this.getPagintaion();

  }
  getPagintaion() {
    this.paginateData = this.emailData.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }
  markAsCompleted(data: boolean) {
    this.isMarkAsCompleted = data;
    this.getAlltickets();
  }
  getAllEmployeeDetails() {
    this.companyService.getAllEmployeeDetailsData().subscribe((res: any) => {
      this.employeeList = res;
    })
  }
  openTokenEmailDetails(data: any) {
    this.isEditToken = false;
    if (data.unread == true) {
      if (this.isDailyOpen) {
        this.tokensService.updateDailyMarkAsRead(data.id).subscribe((res: any) => {
        })
      }
      else {
        this.tokensService.updateMarkAsRead(data.id).subscribe((res: any) => {
        })
      }

    }
    this.isMailOpen = true;
    this.openTokenData = data;
  }
  isValidDate(dateString: string): boolean {
    // Check if the date string is valid
    return !isNaN(Date.parse(dateString));
  }
}
