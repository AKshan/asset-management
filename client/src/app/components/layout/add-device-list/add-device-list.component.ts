import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DataService} from "../../../services/data.service";
import {IDevices} from "../../../interfaces/device.interface";

@Component({
  selector: 'app-add-device-list',
  templateUrl: './add-device-list.component.html',
  styleUrls: ['./add-device-list.component.scss']
})
export class AddDeviceListComponent implements OnInit {
  deviceForm: FormGroup;
  rForm: FormGroup;


  devices: IDevices[] =[];
  deviceName: string;
  deviceIp: string;
  deviceDetails: any;
  deviceData: string;

  validMsg: string = 'This field is required';
  validIpMsg: string = 'Required IP Address is not correct';
  ipValid = "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";

  constructor(private fb: FormBuilder, private activeModal: NgbActiveModal, private dataService: DataService) {
    this.deviceForm = fb.group({
      'deviceName': [null, Validators.required],
      'deviceIp': [null, Validators.compose([Validators.required, Validators.pattern(this.ipValid)])]
    });
  }

  ngOnInit(): void {

  }

  addDevice(deviceDetailsPost: any) {

    this.deviceName = deviceDetailsPost.deviceName;
    this.deviceIp = deviceDetailsPost.deviceIp;
    this.deviceDetails = {loopback: this.deviceIp, name: this.deviceName};

    this.dataService.postDevices(this.deviceDetails).subscribe(
      resp => this.deviceData = resp,
      error => alert(error),
      () =>
        this.dataService.getDevices().subscribe(
          (devices) => {this.devices = devices},
          error => alert(error),
          () => this.rForm.reset(this.devices),
        )

    );
    console.log(this.devices)
  }

  close() {
    this.activeModal.close();
  }


}
