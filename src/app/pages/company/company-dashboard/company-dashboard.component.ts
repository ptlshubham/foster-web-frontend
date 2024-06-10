import { Component } from '@angular/core';
import { CompanyService } from 'src/app/core/services/company.service';
import { ChartType } from './dashboard.model';

import { TokensService } from 'src/app/core/services/tokens.service';
import { elementAt, forkJoin } from 'rxjs';



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

  Tokens: ChartType = {
    chart: {
      width: 227,
      height: 227,
      type: 'pie'
    },
    colors: ["#ffbf53", "#0e8f99", "#2ab57d"],
    legend: { show: false },
    stroke: {
      width: 0
    },
    series: [],
    labels: [],
  };

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
  barChart: ChartType = {
    chart: { height: 350, type: "bar", toolbar: { show: !1 } },
    plotOptions: { bar: { horizontal: !0 } },
    dataLabels: { enabled: !1 },
    series: [],
    colors: ['#2ab57d'],
    grid: { borderColor: "#f1f1f1" },
    xaxis: {
      categories: [

      ],
    },
  };
  donutChart: ChartType = {
    chart: { height: 320, type: "donut" },
    series: [44, 55, 41, 17, 15],
    labels: ["Series 1", "Series 2", "Series 3", "Series 4", "Series 5"],
    colors: ["#2ab57d", "#5156be", "#fd625e", "#4ba6ef", "#ffbf53"],
    legend: {
        show: !0,
        position: "bottom",
        horizontalAlign: "center",
        verticalAlign: "middle",
        floating: !1,
        fontSize: "14px",
        offsetX: 0,
    },
    responsive: [
        {
            breakpoint: 600,
            options: { chart: { height: 240 }, legend: { show: !1 } },
        },
    ],
};
  constructor(
    private companyService: CompanyService,
    public tokensService: TokensService,
  ) {
    const currentDate = new Date();
    this.selectedMonth = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`;
    this.currentMonth = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`;
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
    this.getBarDetails();
    this.getAllDailyWork();
    this.getClientsDetails();
    this.getAllTokenCompanyStatus();
  }
  isCompanyLogin() {
    this.getAllTokens();
    this.getBarDetails();
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
  getBarDetails() {
    forkJoin(
      this.companyService.getAllEmployeeDetailsData(),
      this.companyService.getAllDailyList()
    ).subscribe(([employeeRes, dailyWorkRes]: [any, any]) => {
      this.employeeList = employeeRes;
      const designers = this.employeeList
        .filter((employee: any) => employee.role === 'Designer')
        .map((employee: any) => ({ id: employee.id, name: employee.name }));

      const designerIds = designers.map((designer: any) => designer.id);

      // Initialize counts for total and completed works
      const designerDailyWorkCounts: { [key: string]: number } = {};
      const designerCompletedWorkCounts: { [key: string]: number } = {};

      dailyWorkRes.forEach((work: any) => {
        if (designerIds.includes(work.designerid)) {
          if (!designerDailyWorkCounts[work.designerid]) {
            designerDailyWorkCounts[work.designerid] = 0;
            designerCompletedWorkCounts[work.designerid] = 0;
          }
          designerDailyWorkCounts[work.designerid]++;

          if (work.iscompleted) {
            designerCompletedWorkCounts[work.designerid]++;
          }
        }
      });

      // Prepare series data based on designer daily work counts
      const seriesData = designers.map((designer: any) => ({
        name: designer.name,
        data: [
          designerDailyWorkCounts[designer.id] || 0,
          designerCompletedWorkCounts[designer.id] || 0
        ]
      }));

      // Update x-axis categories with designer names
      this.barChart.xaxis.categories = designers.map((designer: any) => designer.name);

      // Update series data
      this.barChart.series = seriesData;
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
      this.getBarDetails();
    });
  }
  getAllDailyWork() {
    debugger
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

      // Optionally, log or process the totalPendingDailyWork as needed

      // Continue with any additional logic, such as updating UI components
      this.getBarDetails();
    });
  }
  getAllTokens() {
    this.tokensService.getAllTokenData().subscribe((res: any) => {
      this.temparra = res;
      this.pendingDatatotal = res.filter((token: any) => token.status === 'Pending');
      this.processingDatatotal = res.filter((token: any) => token.status === 'Processing').length;
      this.completedDatatotal = res.filter((token: any) => token.status === 'Completed');
      this.cesCompleted = res.filter((token: any) => token.status === 'Completed' && token.label == 'CES').length;
      this.cesInCompleted = res.filter((token: any) => token.status != 'Completed' && token.label == 'CES').length;

      this.CancelToken = res.filter((token: any) => token.status === 'Cancel');
      this.Tokens.series.push(this.pendingDatatotal.length, this.processingDatatotal.length, this.completedDatatotal.length);
      this.Tokens.labels.push('Pending', 'Processing', 'Completed');
    });
  }

  getAllTokenCompanyStatus() {
    debugger
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
    debugger
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
    debugger
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
