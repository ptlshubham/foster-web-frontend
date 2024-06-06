import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/core/services/company.service';
import { TokensService } from 'src/app/core/services/tokens.service';

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

  constructor(private modalService: NgbModal,
    public formBuilder: UntypedFormBuilder,
    public toastr: ToastrService,
    public tokensService: TokensService,
    private companyService: CompanyService,

  ) {
  }


  ngOnInit(): void {
    this.setActiveTab('allTicket');
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Help Desk', active: true }
    ];
    this.validationForm = this.formBuilder.group({
      client: ['', [Validators.required]],
      manager: ['', [Validators.required]],
      designer: ['', [Validators.required]],
      label: [''],
      deliverydate: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: [''],

    });
  }
  get f() { return this.validationForm.controls; }

  open(content: any) {
    this.modalService.open(content, { size: 'xl', centered: true });
  }
  setActiveTab(tab: string): void {
    this.activeTab = tab;
    if (this.activeTab == 'allTicket') {

    }
    else if (this.activeTab == 'pendingTicket') {

    }
    else if (this.activeTab == 'processingTicket') {
    }
    else if (this.activeTab == 'completedTicket') {
    }
  }
}
