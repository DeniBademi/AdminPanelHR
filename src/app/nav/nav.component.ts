import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/Account.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../_services/LocalStorage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  logged: boolean = false;
  cartopen: boolean = false;
  seller: boolean = false;
  model: any = {};
  username : string | undefined;
  animal: string | undefined;
  name: string | undefined;


  constructor(public accountService: AccountService, public router: Router, private lsService: LocalStorageService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  sendToAdmin() {
    throw new Error('Method not implemented.');
    }
    logout() {
    throw new Error('Method not implemented.');
    }
    login(){
      console.log(this.model)
      this.accountService.login(this.model).subscribe(response => {
        
        this.logged = this.accountService.isLogged();
        console.log("in login()", this.logged)
        
        this.router.navigate(['/home'])
      }, error => {
        console.log(error);
        this.toastr.error("Invalid login information")
      })
    }

  openOrders() {
      this.router.navigate(['orders']);
    }
  sendToCreateOffer() {
    this.router.navigate(['product']);
  }
  sendToHome() {
    this.router.navigate(['home']);
  }

}
