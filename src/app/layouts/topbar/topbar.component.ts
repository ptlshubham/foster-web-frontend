import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { EventService } from '../../core/services/event.service';
import { LanguageService } from '../../core/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { TokensService } from 'src/app/core/services/tokens.service';
import { Howl } from 'howler';

import { LAYOUT_MODE } from "../layouts.model";
import { CompanyService } from 'src/app/core/services/company.service';
import { Subscription, forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})

/**
 * Topbar Component
 */
export class TopbarComponent implements OnInit {

  mode: string | undefined;
  element: any;
  flagvalue: any;
  cookieValue: any;
  countryName: any;
  valueset: any;
  adminName: any;
  company: any;
  role: any = localStorage.getItem('Role');
  tokenData: any = []
  emailData!: Array<any>;
  emailIds: number[] = [];
  totalRecords = 0;
  staffModel: any = {}
  profile: any = localStorage.getItem('profile')
  eid: any = localStorage.getItem('Eid');
  sound: any = new Howl({
    src: ['assets/audio/notification.mp3']
  });
  isOpen: boolean = false;

  private intervalId: any;
  private subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    public languageService: LanguageService,
    public _cookiesService: CookieService,
    public translate: TranslateService,
    private eventService: EventService,
    public tokensService: TokensService,
    private companyService: CompanyService


  ) {
    this.getTokenByEmployee(false);
  }

  /**
   * Language Listing
   */
  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'en' },
    { text: 'Spanish', flag: 'assets/images/flags/spain.jpg', lang: 'es' },
    { text: 'German', flag: 'assets/images/flags/germany.jpg', lang: 'de' },
    { text: 'Italian', flag: 'assets/images/flags/italy.jpg', lang: 'it' },
    { text: 'Russian', flag: 'assets/images/flags/russia.jpg', lang: 'ru' },
  ];

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  layoutMode!: string;

  ngOnInit(): void {
    this.adminName = localStorage.getItem('Name');
    this.company = localStorage.getItem('Company');
    this.layoutMode = LAYOUT_MODE;
    this.intervalId = setInterval(() => {
      this.getTokenByEmployee(false);
    }, 180000); // 30000 milliseconds = 30 seconds

    this.element = document.documentElement;
    // Cookies wise Language set
    this.cookieValue = this._cookiesService.get('lang');
    const val = this.listLang.filter(x => x.lang === this.cookieValue);
    this.countryName = val.map(element => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) { this.valueset = 'assets/images/flags/us.jpg'; }
    } else {
      this.flagvalue = val.map(element => element.flag);
    }
  }
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  getTokenByEmployee(obj: any) {
    this.isOpen = obj;
    this.subscription.add(
      this.tokensService.getTokenByEmpIdData(this.eid).subscribe((res: any) => {
        const tokenRequests = res.map((element: any) =>
          this.tokensService.getAssignedTokenEmp(element.id).pipe(
            map((data: any) => {
              element.assignedEmployee = data;
              return element;
            })
          )
        );
        forkJoin(tokenRequests).subscribe((updatedTokens: any) => {
          this.tokenData = [];
          updatedTokens.forEach((element: any) => {
            element.assignedEmployee.forEach((employee: any) => {
              if (employee.empid == this.eid && employee.isnotify == true) {
                this.tokenData.push(element);
              }
            });
          });
          debugger
          if (this.tokenData.length > 0 && this.isOpen == false) {
            this.sound.play();
          }
        });
      })
    );
  }
  clearAllNotification() {
    this.tokensService.updateClearNotification(this.tokenData).subscribe((res: any) => {
      this.getTokenByEmployee(this.isOpen = false);
    })
  }
  /**
   * Language Value Set
   */
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
  }

  /**
   * Topbar Light-Dark Mode Change
   */
  changeMode(mode: string) {
    this.layoutMode = mode;
    this.mode = mode;
    this.eventService.broadcast('changeMode', mode);
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Logout the user
   */
  logout() {
    localStorage.clear();
    this.router.navigate(['/account/login']);
  }


}
