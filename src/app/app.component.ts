import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('myModal') model: ElementRef | undefined;
  recordkeeperObj: RecordKeeper = new RecordKeeper();
  recordkeeperList: RecordKeeper[] = [];
  title: any;

  ngOnInit(): void {
    const localData = localStorage.getItem("angular17crud");
    if (localData != null) {
      this.recordkeeperList = JSON.parse(localData);
    }
  }

  openModel() {
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'block';
    }
  }

  closeModel() {
    this.recordkeeperObj = new RecordKeeper();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  onDelete(item: RecordKeeper) {
    const isDelet = confirm("Are you sure want to Delete");
    if (isDelet) {
      const currentRecord = this.recordkeeperList.findIndex(m => m.id === item.id);
      this.recordkeeperList.splice(currentRecord, 1);
      localStorage.setItem('angular17crud', JSON.stringify(this.recordkeeperList));
    }
  }

  onEdit(item: RecordKeeper) {
    this.recordkeeperObj = item;
    this.openModel();
  }

  updateRecordkeeper() {
    const currentRecord = this.recordkeeperList.find(m => m.id === this.recordkeeperObj.id);
    if (currentRecord != undefined) {
      currentRecord.name = this.recordkeeperObj.name;
      currentRecord.address = this.recordkeeperObj.address;
      currentRecord.mobileNo = this.recordkeeperObj.mobileNo;
    }
    localStorage.setItem('angular17crud', JSON.stringify(this.recordkeeperList));
    this.closeModel();
  }

  saveRecordkeeper() {
    debugger;
    const isLocalPresent = localStorage.getItem("angular17crud");
    if (isLocalPresent != null) {
      const oldArray = JSON.parse(isLocalPresent);
      this.recordkeeperObj.id = oldArray.length + 1;
      oldArray.push(this.recordkeeperObj);
      this.recordkeeperList = oldArray;
      localStorage.setItem('angular17crud', JSON.stringify(oldArray));
    } else {
      const newArr: RecordKeeper[] = [];
      newArr.push(this.recordkeeperObj);
      this.recordkeeperObj.id = 1;
      this.recordkeeperList = newArr;
      localStorage.setItem('angular17crud', JSON.stringify(newArr));
    }
    this.closeModel();
  }
}

export class RecordKeeper {
  id: number;
  name: string;
  mobileNo: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  address: string;

  constructor() {
    this.id = 0;
    this.address = '';
    this.city = '';
    this.email = '';
    this.mobileNo = '';
    this.name = '';
    this.state = '';
    this.pincode = '';
  }
}

