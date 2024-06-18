import { Component } from '@angular/core';
import { CompanyService } from 'src/app/core/services/company.service';
import { ChartType } from './dashboard.model';

import { TokensService } from 'src/app/core/services/tokens.service';
import { forkJoin } from 'rxjs';



@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrl: './company-dashboard.component.scss'
})
export class CompanyDashboardComponent {
  public employeeList: any = [];
  public clientlist: any = []
  num: number = 0;
  option = {
    startVal: this.num,
    useEasing: true,
    duration: 2,
    // decimalPlaces: 2,
  };
  tokendata: any = []
  pendingData: any = [];
  pendingDatatotal: any = []
  processingDatatotal: any = []
  processingData: any = [];
  completedDatatotal: any = []
  reviewData: any = [];
  temparra: any = []
  changesData: any = [];
  completedData: any = [];
  cancelData: any = [];
  staffModel: any = {};
  employeeDataList: any = [];
  dailyWorkData: any = [];
  dailyEmpWorkData: any = [];

  pendingStories: number = 0;
  completedStories: number = 0;
  pendingPosts: number = 0;
  completedPosts: number = 0;
  pendingReels: number = 0;
  CompletedReel: number = 0;
  CompletedStories: number = 0;
  CompletedPosts: number = 0;
  completedReels: number = 0;
  extraPending: number = 0;
  extraCompleted: number = 0;
  totalPending: number = 0;
  totalCompleted: number = 0;
  pendingExtraToken: any = 0;
  CompletedExtraToken: any = 0;
  tokenDataForClient: any = [];
  managerList: any = []
  dailyWorkLength: number = 0;
  CESTotal: number = 0;
  totalPendingDailyWork: number = 0;
  TodoList: any;
  CancelToken: any = 0;
  totalCompletedDailyWork: number = 0;
  todoList: any = []
  calendarEvents: any = []
  eid: any = localStorage.getItem('Eid');
  title!: string;
  selectedMonth: string;
  selectedBarMonth: string;
  currentMonth: string;
  designerList: any = []
  processingEmployeeTokens: any = []
  completedEmployeeTokens: any = []
  pendingEmployeeTokens: any = []
  page = 1;
  pageSize = 9;
  collectionSize = 0;
  paginateData: any = [];

  assignedClientsForEmployee: any = [];
  SelectedClient = this.tokendata.clientname || null;
  SelectedEmpClient = this.tokendata.clientname || null;
  companyRole: any = localStorage.getItem('Role');

  tokendatemployee: any = [];
  totalOfDailyWorkForEmployee: number = 0;
  dailyWorkBoard: any = []
  tokenData: any = [];
  tokendataForEmployee: any = []
  empCompletedTokenNumber: number = 0;
  empPendingTokenNumber: number = 0;
  empProcessingTokenNumber: number = 0;

  forEmpPendingStories: number = 0;
  forEmpCompletedStories: number = 0;
  forEmpPendingPost: number = 0;
  forEmpCompletedPost: number = 0;
  forEmpPendingReels: number = 0;
  forEmpCompletedReels: number = 0;
  forEmpExtraPending: number = 0;
  forEmpExtraCompleted: number = 0;

  forEmpTotalPending: number = 0;
  forEmpTotalCompleted: number = 0;
  forEmpTotalTask: number = 0;

  cesCompleted: number = 0;
  cesInCompleted: number = 0;

  dailyWorkOverview: ChartType = {
    chart: {
      height: 270,
      type: 'radialBar',
      offsetY: -10
    },
    plotOptions: {
      radialBar: {
        startAngle: -130,
        endAngle: 130,
        dataLabels: {
          name: {
            show: false
          },
          value: {
            offsetY: 10,
            fontSize: '18px',
            color: undefined,
            formatter: function (val: any) {
              return Math.floor(val) + "%";
            }
          }
        }
      }
    },
    colors: ['#2ab57d'],
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors: ['#ffbf53'],
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [20, 60],
      },
    },
    stroke: {
      dashArray: 4,
    },
    legend: {
      show: false
    },
    series: [0],
    labels: ['Pending', 'Completed'],
  };
  donutChart: ChartType = {
    chart: {
      height: 320,
      type: 'donut',
    },
    series: [],
    labels: [],
    colors: ['#fd625e', '#5156be', '#2ab57d', '#4ba6ef', '#ffbf53'],
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      verticalAlign: 'middle',
      floating: false,
      fontSize: '14px',
      offsetX: 0,
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 240,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
  };

  marketOverview: ChartType = {
    chart: {
      height: 400,
      type: 'bar',
      stacked: !0,
      offsetY: -5,
      toolbar: {
        show: !1
      }
    },
    series: [
      {
        data: [],
      }

    ],
    plotOptions: { bar: { columnWidth: "20%" } },
    stroke: {
      curve: 'smooth'
    },
    colors: ["#ffbf53", "#34c38f"],
    fill: { opacity: 1 },
    dataLabels: { enabled: !1 },
    legend: { show: !1 },
    xaxis: {
      categories: [
      ],
      labels: { rotate: -90 },
    },
  };

  constructor(
    private companyService: CompanyService,
    public tokensService: TokensService,
  ) {
    const currentDate = new Date();
    this.selectedMonth = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`;
    this.currentMonth = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`;
    this.selectedBarMonth = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`;
  }
  ngOnInit(): void {

    this.getAllTodoListDetails();
    if (this.companyRole == 'Designer') {
      this.isDesignerLogin();
    }
    else if (this.companyRole == 'companyAdmin') {
      this.isCompanyLogin();
    }
    else if (this.companyRole == 'Manager') {
      this.isManagerLogin();
    }
  }
  isDesignerLogin() {
    this.getAllTokenByEmployee();
    this.getAssignedClientsData();
    this.getAlldailyWorkForEmployee(null);
  }

  isManagerLogin() {
    this.getAllTokens();
    this.getAllDailyWork();
    this.getClientsDetails();
    this.getAllTokenCompanyStatus();
  }
  isCompanyLogin() {
    this.getAllTokens();
    this.getAllEmployeeDetails();
    this.getAllDailyWork();
    this.getClientsDetails();
    this.getAllTokenCompanyStatus();
  }
  onMonthChange() {
    this.getAllTokenCompanyStatus();
  }
  getClientsDetails() {
    this.companyService.getAllClientDetailsData().subscribe((res: any) => {
      this.clientlist = res;
    })
  }

  onMonthBarChange() {
    this.getBarDetails();
  }
  
  getBarDetails() {
    const selectedDate = new Date(this.selectedBarMonth);
    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();
  
    const designerList = this.employeeList.filter((item: any) => item.role === 'Designer');
  
    this.companyService.getAllDailyList().subscribe((data: any) => {
      const filteredData = data.filter((item: any) => {
        const itemDate = new Date(item.date);
        const isSameMonth = itemDate.getMonth() === selectedMonth;
        const isSameYear = itemDate.getFullYear() === selectedYear;
        const isDesigner = designerList.some((designer: any) => designer.id === item.designerid);
  
        return isSameMonth && isSameYear && isDesigner;
      });
  
      const categories = designerList.map((designer: any) => designer.name);
      const completedSeriesData = categories.map((name: any) => {
        const designerData = filteredData.filter((item: any) => item.designername === name && item.iscompleted);
        return designerData.length;
      });
      const pendingSeriesData = categories.map((name: any) => {
        const designerData = filteredData.filter((item: any) => item.designername === name && !item.iscompleted);
        return -designerData.length;
      });
  
      this.marketOverview.xaxis.categories = categories;
      this.marketOverview.series = [
        { name: 'Daily Pending', data: pendingSeriesData },
        { name: 'Daily Completed', data: completedSeriesData }
      ];
    });
  }


  changeStatusMail(event: Event, id: number): void {
    ;
    const isChecked = (event.target as HTMLInputElement).checked;
    let data = {
      id: id,
      iscompleted: isChecked
    };
    this.companyService.updateDailyById(data).subscribe((res: any) => {
    });
  }
  getAllDailyWork() {

    this.companyService.getAllDailyList().subscribe((data: any) => {
      // Store all daily work data
      this.dailyWorkData = data;

      // Calculate the length of all daily work data
      this.dailyWorkLength = this.dailyWorkData.length;

      // Filter and count pending stories, posts, and reels
      const pendingStories = this.dailyWorkData.filter((item: any) => item.title === 'Story' && !item.iscompleted).length;
      const pendingPosts = this.dailyWorkData.filter((item: any) => item.title === 'Post' && !item.iscompleted).length;
      const pendingReels = this.dailyWorkData.filter((item: any) => item.title === 'Reel' && !item.iscompleted).length;
      const CompletedStories = this.dailyWorkData.filter((item: any) => item.title === 'Story' && item.iscompleted).length;
      const CompletedPosts = this.dailyWorkData.filter((item: any) => item.title === 'Post' && item.iscompleted).length;
      const CompletedReel = this.dailyWorkData.filter((item: any) => item.title === 'Reel' && item.iscompleted).length;
      // Calculate the total number of pending tasks
      this.totalCompletedDailyWork = CompletedStories + CompletedPosts + CompletedReel;
      this.totalPendingDailyWork = pendingStories + pendingPosts + pendingReels;
    });
  }
  getAllTokens() {
    this.tokensService.getAllTokenData().subscribe((res: any) => {
      this.temparra = res;
      this.pendingDatatotal = res.filter((token: any) => token.status === 'Pending');
      this.processingDatatotal = res.filter((token: any) => token.status === 'Processing').length;
      this.completedDatatotal = res.filter((token: any) => token.status === 'Completed');

      this.donutChart.series = [
        this.pendingDatatotal.length,
        this.processingDatatotal,
        this.completedDatatotal.length
      ];
      this.donutChart.labels = ['Pending Tokens', 'Processing Tokens', 'Completed Tokens'];
    });
  }

  getAllTokenCompanyStatus() {

    this.tokensService.getAllTokenData().subscribe((res: any) => {
      if (this.SelectedClient != null) {

        // Filter token data based on selected client
        this.tokendata = res.filter((token: any) => token.clientid === this.SelectedClient.id);

        // Fetch daily work data and aggregate the required counts based on selected client
        this.getAllDailyWorkByClientId(this.SelectedClient.id);
      } else {
        // No client selected, fetch and process all data
        this.tokendata = res;
        this.getAllDailyWorkByClientId(null); // Pass null to indicate no specific client
      }
    });
  }


  getAllDailyWorkByClientId(clientId: number | null) {

    this.dailyWorkData = [];
    this.companyService.getAllDailyList().subscribe((data: any) => {
      // Filter daily work data based on selected client and month
      if (clientId !== null) {
        this.dailyWorkData = data.filter((element: any) => {
          // Check if the date falls within the selected month
          return element.clientid === clientId && element.date.includes(this.selectedMonth);
        });

        if (this.companyRole === 'Designer') {
          this.dailyWorkData = this.dailyWorkData.filter((element: any) => element.designerid === this.eid);
        }
      } else {
        // No client selected, use all data for the selected month
        this.dailyWorkData = data.filter((element: any) => element.date.includes(this.selectedMonth));
      }

      // Filter and count pending and completed stories, posts, reels
      this.pendingStories = this.dailyWorkData.filter((item: any) => item.title === 'Story' && !item.iscompleted).length;
      this.completedStories = this.dailyWorkData.filter((item: any) => item.title === 'Story' && item.iscompleted).length;

      this.pendingPosts = this.dailyWorkData.filter((item: any) => item.title === 'Post' && !item.iscompleted).length;
      this.completedPosts = this.dailyWorkData.filter((item: any) => item.title === 'Post' && item.iscompleted).length;

      this.pendingReels = this.dailyWorkData.filter((item: any) => item.title === 'Reel' && !item.iscompleted).length;
      this.completedReels = this.dailyWorkData.filter((item: any) => item.title === 'Reel' && item.iscompleted).length;

      // Calculate totals and completion percentage
      this.totalPending = this.pendingStories + this.pendingPosts + this.pendingReels;
      this.totalCompleted = this.completedStories + this.completedPosts + this.completedReels;

      const totalTasks = this.totalPending + this.totalCompleted;
      const completionPercentage = totalTasks > 0 ? Math.floor((this.totalCompleted / totalTasks) * 100) : 0;

      this.dailyWorkOverview.series = [completionPercentage];
      if (clientId !== null) {
        this.getAllToken(clientId);
      }
    });
  }


  getAllToken(clientId: number) {
    this.tokensService.getAllTokenData().subscribe((res: any) => {

      this.tokenDataForClient = res.filter((token: any) => token.clientid === clientId);
      this.pendingExtraToken = this.tokenDataForClient.filter((token: any) => token.status === 'Pending').length;
      this.CompletedExtraToken = this.tokenDataForClient.filter((token: any) => token.status === 'Completed').length;
    });
  }
  getAllEmployeeDetails() {
    this.companyService.getAllEmployeeDetailsData().subscribe((res: any) => {
      this.employeeList = res;

      this.getBarDetails();
      this.staffModel.role = localStorage.getItem('Role')
    })
  }

  getAllClientDetails(id: any) {
    this.companyService.getClientDetailsById(id).subscribe((res: any) => {
      this.clientlist = res;

    })
  }

  getAllTodoListDetails() {
    this.companyService.getTodoListDataById(this.eid).subscribe((res: any) => {
      this.todoList = res;
      for (let i = 0; i < this.todoList.length; i++) {
        this.todoList[i].index = i + 1;
      }
      this.collectionSize = this.todoList.length;
      this.getPagintaion();
    });
  }

  getPagintaion() {
    this.paginateData = this.todoList.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  getAssignedClientsData() {
    this.companyService.getEmployeeIdByClient(this.eid).subscribe((data: any) => {
      this.assignedClientsForEmployee = data;
    });
  }

  getAllTokenByEmployee() {
    this.tokensService.getTokenByEmpIdData(this.eid).subscribe((res: any) => {
      this.empCompletedTokenNumber = res.filter((token: any) => token.status == 'Completed').length;
      this.empPendingTokenNumber = res.filter((token: any) => token.status == 'Pending').length;
      this.empProcessingTokenNumber = res.filter((token: any) => token.status == 'Processing').length;
    });
    this.companyService.getAllDailyList().subscribe((data: any) => {
      const empTotalDaily = data.filter((element: any) => element.designerid == this.eid);
      this.forEmpTotalTask = empTotalDaily.filter((element: any) => element.date.includes(this.currentMonth)).length;
    });
  }
  onEmpMonthChange() {
    this.getAlldailyWorkForEmployee(null);
  }
  onSelectionChange(data: any) {

    if (data != null) {
      this.getAlldailyWorkForEmployee(data.clientid);
    }
    else {
      this.getAlldailyWorkForEmployee(null);
    }
  }
  getAlldailyWorkForEmployee(clientId: number | null) {
    this.dailyEmpWorkData = [];
    this.companyService.getAllDailyList().subscribe((data: any) => {
      if (clientId != null) {
        this.dailyEmpWorkData = data.filter((element: any) => {
          return element.clientid === clientId && element.date.includes(this.selectedMonth);
        });
        this.tokensService.getTokenByEmpIdData(this.eid).subscribe((res: any) => {
          const tokensData = res.filter((item: any) => item.clientid == clientId);
          this.forEmpExtraPending = tokensData.filter((item: any) => item.status == 'Pending').length;
          this.forEmpExtraCompleted = tokensData.filter((item: any) => item.status == 'Completed').length;
        });
      } else {
        this.dailyEmpWorkData = data.filter((element: any) => element.designerid == this.eid && element.date.includes(this.selectedMonth));
        this.tokensService.getTokenByEmpIdData(this.eid).subscribe((res: any) => {
          this.forEmpExtraPending = res.filter((item: any) => item.status == 'Pending').length;
          this.forEmpExtraCompleted = res.filter((item: any) => item.status == 'Completed').length;
        });
      }
      this.forEmpPendingStories = this.dailyEmpWorkData.filter((item: any) => item.title === 'Story' && !item.iscompleted).length;
      this.forEmpCompletedStories = this.dailyEmpWorkData.filter((item: any) => item.title === 'Story' && item.iscompleted).length;

      this.forEmpPendingPost = this.dailyEmpWorkData.filter((item: any) => item.title === 'Post' && !item.iscompleted).length;
      this.forEmpCompletedPost = this.dailyEmpWorkData.filter((item: any) => item.title === 'Post' && item.iscompleted).length;

      this.forEmpPendingReels = this.dailyEmpWorkData.filter((item: any) => item.title === 'Reel' && !item.iscompleted).length;
      this.forEmpCompletedReels = this.dailyEmpWorkData.filter((item: any) => item.title === 'Reel' && item.iscompleted).length;

      // Calculate totals and completion percentage
      this.forEmpTotalPending = this.forEmpPendingStories + this.forEmpPendingPost + this.forEmpPendingReels;
      this.forEmpTotalCompleted = this.forEmpCompletedStories + this.forEmpCompletedPost + this.forEmpCompletedReels;

      const totalTasks = this.forEmpTotalPending + this.forEmpTotalCompleted;
      const completionPercentage = totalTasks > 0 ? Math.floor((this.forEmpTotalCompleted / totalTasks) * 100) : 0;

      this.dailyWorkOverview.series = [completionPercentage];
    });
  }
}
