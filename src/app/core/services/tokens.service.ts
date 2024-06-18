import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TokensService {
    constructor(
        private httpClient: HttpClient
    ) { }
    uploadTokenImage(img: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.uploadTokenImageURL, img);
    }
    UploadMultiToken(img: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.uploadTokenMultiImageURL, img);
    }
    RemoveRefrenceMultiImage(id: any) {
        let bnr = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.removeRefrenceMultiImageURL, bnr);
    }
    SaveTokendetails(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveTokenDetailsListURL, admin);
    }

    deleteInfraImage(data: any) {

        return this.httpClient.post(ApiService.deleteInfraImageURL, data);
    }

    getAllTokenData() {
        return this.httpClient.get(ApiService.getALLTokenDetailsURL);
    }
    getTokenByEmpIdData(id: any) {
        return this.httpClient.get(ApiService.getEmployeeTokenByIdURL + id);
    }
    updateMarkAsRead(id: any) {
        return this.httpClient.get(ApiService.updateTokenUnreadStatusURL + id);
    }
    getMultiTokenImageData(id: any) {
        return this.httpClient.get(ApiService.getALLTokenImageURL + id);
    }

    updateTokenStatus(data: any) {
        return this.httpClient.post(ApiService.updateTokenStatusDetailsURL, data);
    }
    getAssignedTokenEmp(id: any) {
        return this.httpClient.get(ApiService.getAssignedEmpTokenByIdURL + id);
    }

    updateDailyMarkAsRead(id: any) {
        return this.httpClient.get(ApiService.updateDailyWorkUnreadStatusURL + id);
    }

    updateClearNotification(data: any) {
        return this.httpClient.post(ApiService.updateTokenNotificationURL, data);
    }
    updateNotificationTicket(data:any){
        return this.httpClient.post(ApiService.updateTicketNotificationURL,data);
    }
    updateClearAllTicketNotification(data:any){
        return this.httpClient.post(ApiService.updateTicketForAdminNotificationURL,data);
    }
    saveHelpTicket(data: any): Observable<any> {
        return this.httpClient.post(ApiService.saveHelpTicketURL, data);
    }
    getAllHelpTicket() {
        return this.httpClient.get<any>(ApiService.GetAllHelpTicketURL);
    }
    updateHelpTicketStatus(data: any) {
        return this.httpClient.post(ApiService.UpdateHelpTokenStatusDetailsURL, data);
    }
    removeTokensData(id: any) {
        return this.httpClient.get(ApiService.removeTokensByIdURL + id);
    }
    // CES Tokens

    getAllCESTokenData(){
        return this.httpClient.get(ApiService.getALLCESTokenDataURL);

    }
    getCESMultiTokenImageData(id: any) {
        return this.httpClient.get(ApiService.getCESTokenImageURL + id);
    }
    
    SaveConvertCesTokendetails(admin: any): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveConvertCesToTokenDetailsURL, admin);
    }
}