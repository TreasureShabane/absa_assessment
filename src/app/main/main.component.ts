import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(private httpClient: HttpClient){}

  rows: any;
  headers = ["Account Number", "Account Type", "Balance", ""];
  balance: number = 0;
  ngOnInit(){
    this.httpClient.get("http://localhost:8080/api/accounts").subscribe(data =>{
      console.log(data);
      this.processData(data);
    })
  }

  processData(results: any): void{
    this.rows = [];
    let status = true;
    let balInt: number;
    results.forEach((element: { account_type: string; balance: number; account_number: any; }) => {
      if(element.account_type == "savings"){
        if(element.balance > 0){
          status = true;
        }else{
          status = false;
        }
      }else if(element.account_type == "cheque"){
        if(element.balance > -500){
          status = true;
        }else{
          status = false;
        }
      }
      this.rows.push({account_number: element.account_number, account_type: element.account_type, balance: element.balance, status: status})
      balInt =+ element.balance;
      this.balance += balInt;
    });
  }

  buttonClicked(): void{
    alert("Success")
  }

}
