import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-input-popup',
  templateUrl: './input-popup.component.html',
  styleUrls: ['./input-popup.component.css']
})
export class InputPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InputPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }
}


export interface DialogData {
  title: string;
  content: string;
  label: string;
  value: string;
}
