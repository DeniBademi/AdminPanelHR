import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, ɵɵsetComponentScope } from "@angular/core";
import { Observable } from "rxjs";
import { Token } from "../_models/Token";
import { AccountService } from "../_services/Account.service";
import { LocalStorageService } from '../_services/LocalStorage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    token : Token | undefined
    constructor(private lsService : LocalStorageService, private accountService: AccountService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //console.log("Request is in interceptor");

        this.token = this.lsService.getToken();
        try{
           var test = this.accountService.getCurrentUser()['token'];
        var authHeader = 'Bearer ' + test;//this.token.access_token;
        const authReq = req.clone({setHeaders: {Authorization: authHeader}});
        //console.log(authReq);

        return next.handle(authReq); 
        }
        catch
        {
    
            return next.handle(req);
        }
    }
}
