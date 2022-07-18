import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators, ɵFormGroupRawValue,
  ɵGetProperty,
  ɵTypedOrUntyped
} from "@angular/forms";
import {AccountService} from "../services/account.service";

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit {

  operationFromGroup!: FormGroup;
  private accountNumber!: FormControl;
  private operationType!: FormControl;
  private amount!: FormControl;
  private description!: FormControl;
  errorMessage!: string;

  constructor(private service: AccountService) { }

  ngOnInit(): void {
    this.accountNumber = new FormControl(null,[Validators.required, Validators.min(1)]);
    this.operationType = new FormControl('DEPOSIT', [ Validators.required]);
    this.amount = new FormControl(null,[ Validators.required, Validators.min(10)]);
    this.description = new FormControl(null, [ Validators.required]);

    this.operationFromGroup = new FormGroup({
      accountNumber: this.accountNumber,
      operationType: this.operationType,
      amount: this.amount,
      description: this.description
    })
  }

  handleAccountOperation() {
    console.log(this.accountNumber)
    if(this.operationType.value === 'DEPOSIT'){
      this.service.deposit(this.accountNumber.value, this.amount.value, this.description.value).subscribe({
        next: (data) => alert('Success deposit'),
        error: (e) => alert(e),
        complete: () => console.info('complete')
      })
    }else{
      this.service.withdrawal(this.accountNumber.value, this.amount.value, this.description.value).subscribe({
        next: (data) => alert('Success withdrawal'),
        error: (e) => alert(e),
        complete: () => console.info('complete')
      })
    }
    this.operationFromGroup.reset();
  }

  validateAccountNumber() {
    return this.accountNumber.valid || this.accountNumber.untouched;
  }

  validateOperationType() {
    return this.operationType.valid || this.operationType.untouched;
  }

  validateAmount() {
    return this.amount.valid || this.amount.untouched;
  }

  validateDescription() {
    return this.description.valid || this.description.untouched;
  }
}
