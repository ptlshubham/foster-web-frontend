import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/core/services/company.service';
import { TokensService } from 'src/app/core/services/tokens.service';

@Component({
  selector: 'app-ces-design-token',
  templateUrl: './ces-design-token.component.html',
  styleUrl: './ces-design-token.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class CesDesignTokenComponent implements OnInit {
  tokenModel: any = {};
  imageUrl: any = "assets/images/file-upload-image.jpg";
  editFile: boolean = true;
  removeUpload: boolean = false;
  cardImageBase64: any;
  addMultiImg: any = [];

  val: number = 0;
  tokenImage: any;
  tokenMultiImage: any = [];
  multiTokenImgData: any = [];
  breadCrumbItems!: Array<{}>;
  paginateData!: Array<any>;
  emailData!: Array<any>;
  emailIds: any[] = [];

  totalRecords = 0;
  startIndex = 1;
  endIndex = 20;
  page = 1;
  pageSize = 10;
  cesClientId: any;
  activeTab: string = 'allTokens';
  isMailOpen: boolean = false;
  tokenData: any = [];
  tempTokenData: any = [];

  assignPendingData: any = [];
  assignCompletedData: any = [];

  assignedEmpData: any = [];
  designerList: any = [];
  constructor(
    public tokensService: TokensService,
    public toastr: ToastrService,
    private companyService: CompanyService
  ) {
  }
  ngOnInit(): void {
    this.val++;
    this.setActiveTab('allTokens');
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Generate Tokens', active: true }
    ];
  }

  setActiveTab(tab: string): void {
    this.emailData = [];
    this.activeTab = tab;
    this.isMailOpen = false;
    if (this.activeTab == 'allTokens') {
      this.getAllToken();
    }
    else if (this.activeTab == 'assignPendingToken') {
      this.emailData = this.assignPendingData;
      this.getArrayLengthOfEmail();
    }
    else if (this.activeTab == 'assignCompletedTokens') {
      this.emailData = this.assignCompletedData;
      this.getArrayLengthOfEmail();
    }
  }

  getArrayLengthOfEmail() {
    this.paginateData = [];
    this.totalRecords = this.emailData.length;
    for (let i = 0; i < this.emailData.length; i++) {
      this.emailData[i].index = i + 1;
    }
    this.getPagintaion();
  }
  getAllToken() {
    this.tokensService.getAllCESTokenData().subscribe((res: any) => {
      this.tokenData = res;
      this.updateDerivedData();
    });
  }
  updateDerivedData() {
    this.assignPendingData = this.tokenData.filter((token: any) => token.isassign == false);
    this.assignCompletedData = this.tokenData.filter((token: any) => token.isassign == true);
    this.emailData = this.tokenData;
    this.totalRecords = this.tokenData.length;
    this.tokenData.forEach((token: { index: any; }, index: number) => token.index = index + 1);
    this.getPagintaion();
  }
  getPagintaion() {

    this.paginateData = this.emailData.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }

  downloadImage(imageUrl: string): void {
    const filename = this.generateFileName(imageUrl);
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;

        // Programmatically trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
      })
      .catch(error => {
        console.error('Error downloading image:', error);
        // Handle error as needed
      });
  }
  generateFileName(imageUrl: string): string {
    const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
    return filename;
  }
  backToToken() {
    this.tokenModel = {};
    this.isMailOpen = false;
  }
  openEmailTokens(data: any) {
    this.tokenModel = {};
    this.multiTokenImgData = [];
    this.cesClientId = 36; // This is static CES client Id
    if (data.isassign == true) {
      this.tokensService.getAssignedTokenEmp(data.tokenid).subscribe((data: any) => {
        this.tokenModel.assignedDesigners = data.filter((employee: any) => employee.role === 'Designer');
        this.tokenModel.assignedManagers = data.filter((employee: any) => employee.role === 'Manager');
      });
    }
    this.getAssignedEmpData(this.cesClientId);
    this.tokenModel = data;
    debugger
    this.isMailOpen = true;
    this.tokensService.getCESMultiTokenImageData(data.id).subscribe((res: any) => {
      this.multiTokenImgData = res;
    })


  }
  getAssignedEmpData(id: any) {
    this.companyService.getAssignedEmpDetailsById(id).subscribe((res: any) => {
      this.assignedEmpData = res;
      this.designerList = res.filter((employee: any) => employee.role === 'Designer');
    })
  }
  convertCesToToken() {
    let data = [{ empid: 15, email: 'hershamin04@gmail.com', name: 'Harshil Amin' }];
    this.tokenModel.managers = data;
    this.tokenModel.clientid = this.cesClientId;
    this.tokenModel.label = 'CES';
    this.tokenModel.tokenMultiImage = this.multiTokenImgData;
    if (this.tokenModel.description == undefined) {
      this.tokenModel.description = null;
    }
    debugger
    this.tokensService.SaveConvertCesTokendetails(this.tokenModel).subscribe((res: any) => {
      // this.tokenData = res;
      this.setActiveTab('allTokens');
      this.toastr.success('Token Details Successfully Saved.', 'Success', { timeOut: 3000, });
      this.tokenModel = {};
    })
  }
}
