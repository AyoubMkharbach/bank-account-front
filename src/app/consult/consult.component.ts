import { Component, OnInit } from '@angular/core';
import {AccountService} from "../services/account.service";
import {Account} from "../model/account.model";
import {catchError, throwError} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css']
})
export class ConsultComponent implements OnInit {

  account: Account | undefined;
  errorMessage!: string;
  searchFormGroup: FormGroup | undefined;

  constructor(private service: AccountService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      accountNumber: this.formBuilder.control("")
    })
  }

  getAccount() {
    let accountNumber = this.searchFormGroup?.value.accountNumber;
    this.service.getAccount(accountNumber).subscribe({
      next: (data) => this.account = data,
      error: (e) => this.errorMessage = e,
      complete: () => console.info('complete')
    })
  }

}
