import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public static HOST_URL: string = "http://localhost:9000";
  // public static HOST_URL: string = "https://api.cesociety.in";

  constructor(
  ) { }
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  //authenticate

  public static organizationLoginURL: string = ApiService.HOST_URL + '/authenticate/OrganizationLogin';

  // Company APIS
  public static deleteInfraImageURL: string = ApiService.HOST_URL + '/admin/deleteInfraImage';

  public static saveEmployeeProfileImagesURL: string = ApiService.HOST_URL + '/admin/SaveEmployeeProfileImages';
  public static saveEmployeeDetailsListURL: string = ApiService.HOST_URL + '/admin/SaveEmployeeDetailsList';
  public static updateEmployeeDetailsByIdURL: string = ApiService.HOST_URL + '/admin/UpdateEmployeeDetailsById';
  public static getAllEmployeeDetailsURL: string = ApiService.HOST_URL + '/admin/GetAllEmployeeDetails';
  public static getEmployeeDetailsURL: string = ApiService.HOST_URL + '/admin/GetEmployeeDetails';
  public static removeEmployeeDetailsByIdURL: string = ApiService.HOST_URL + '/admin/RemoveEmployeeDetailsById';

  public static SaveClientImageURL: string = ApiService.HOST_URL + '/admin/SaveClientImage';
  public static SaveClientDetailsURL: string = ApiService.HOST_URL + '/admin/SaveClientDetails';
  public static getAllClientDetailsURL: string = ApiService.HOST_URL + '/admin/GetAllClientDetails';
  public static removeClientDetailsByIdURL: string = ApiService.HOST_URL + '/admin/RemoveClientDetailsById/';
  public static getAssignedEmployeeDetailsURL: string = ApiService.HOST_URL + '/admin/GetAssignedEmployeeDetails/';
  public static updateClientDetailsByIDURL: string = ApiService.HOST_URL + '/admin/UpdateClientDetailsByID';

  public static uploadTokenImageURL: string = ApiService.HOST_URL + '/admin/UploadTokenImage';
  public static uploadTokenMultiImageURL: string = ApiService.HOST_URL + '/admin/UploadTokenMultiImage';
  public static removeRefrenceMultiImageURL: string = ApiService.HOST_URL + '/admin/RemoveRefrenceImage';
  public static saveTokenDetailsListURL: string = ApiService.HOST_URL + '/admin/SaveTokenDetailsList';
  public static getALLTokenDetailsURL: string = ApiService.HOST_URL + '/admin/GetALLTokenDetails';
  public static updateTokenUnreadStatusURL: string = ApiService.HOST_URL + '/admin/UpdateTokenUnreadStatus/';
  public static getALLTokenImageURL: string = ApiService.HOST_URL + '/admin/GetALLTokenImage/';

  public static getEmployeeTokenByIdURL: string = ApiService.HOST_URL + '/admin/GetEmployeeTokenById/';
  public static updateTokenStatusDetailsURL: string = ApiService.HOST_URL + '/admin/UpdateTokenStatusDetails';
  public static getAssignedEmpTokenByIdURL: string = ApiService.HOST_URL + '/admin/GetAssignedEmpTokenById/';
  public static ChackForPasswordURL: string = ApiService.HOST_URL + '/admin/ChackForPassword';
  public static updatePasswordURL: string = ApiService.HOST_URL + '/admin/UpdateCompanyPassword';
  public static getEmployeeDataByIdURL: string = ApiService.HOST_URL + '/admin/getEmployeeDataById/';

  public static SaveAttendanceDetailsURL: string = ApiService.HOST_URL + '/admin/SaveAttendanceDetails';
  public static getAllAttendanceListURL: string = ApiService.HOST_URL + '/admin/GetAllAttendanceList';
  public static GetClientDetailsByIdURL: string = ApiService.HOST_URL + '/admin/getClientDetailsById/';


  public static saveTodoListDetailsURL: string = ApiService.HOST_URL + '/admin/SaveTodoListDetails';
  public static getALLTodoListByIdURL: string = ApiService.HOST_URL + '/admin/GetALLTodoListById/';
  public static removeTodoListByIdURL: string = ApiService.HOST_URL + '/admin/RemoveTodoListById/';
  public static updateTodoListByIdURL: string = ApiService.HOST_URL + '/admin/UpdateTodoListById';

  public static saveSchedulerDetailsURL: string = ApiService.HOST_URL + '/admin/SaveSchedulerDetails';
  public static getALLSchedulerByIdURL: string = ApiService.HOST_URL + '/admin/GetALLSchedulerById/';
  public static removeSchedulerByIdURL: string = ApiService.HOST_URL + '/admin/RemoveSchedulerById/';
  public static updateSchedulerByIdURL: string = ApiService.HOST_URL + '/admin/UpdateSchedulerById';
  public static updateDailyWorkByIdURL: string = ApiService.HOST_URL + '/admin/UpdateDailyWorkById';
  public static getALLDailyWorkURL: string = ApiService.HOST_URL + '/admin/GetALLDailyWork';
  public static updateDailyWorkUnreadStatusURL: string = ApiService.HOST_URL + '/admin/UpdateDailyWorkUnreadStatus/';
  public static SaveBulkSchedulerDetailsURL: string = ApiService.HOST_URL + '/admin/SaveBulkSchedulerDetails/';




  //Cashfree APIS
  public static createCashfreeOrderURL: string = ApiService.HOST_URL + '/cashfree/createCashfreeOrder';
  public static UpdateEmployeeLogoURL: string = ApiService.HOST_URL + '/admin/UpdateEmployeeLogo';





}
