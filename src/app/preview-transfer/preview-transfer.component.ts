import { Component, OnInit } from '@angular/core';

import { ITransfer } from '../models/transfer.model';
import { DataService } from "../services/data.service";

@Component({
  selector: 'app-preview-transfer',
  templateUrl: './preview-transfer.component.html',
  styleUrls: ['./preview-transfer.component.css']
})
export class PreviewTransferComponent implements OnInit {

  transfer: ITransfer;

  constructor(private data: DataService) {     
  }

  ngOnInit(): void {    
    this.data.currentMessage.subscribe(message => {
      this.transfer = message; console.log('preview', this.transfer)
    });
  }

  transferMoney() {
    this.transfer.isPreview = false;
    const dif = +(this.transfer.fromAccountBalance - this.transfer.amount).toFixed(2);
    this.transfer.fromAccountBalance = dif >= 500 ? dif : this.transfer.fromAccountBalance;
    this.data.changeMessage(this.transfer);
  }

}