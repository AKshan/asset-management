import { Component, OnInit} from '@angular/core';
import { DataService } from '../../services/data.service';
import { IDevices } from '../../interfaces/device.interface';
import { IDevicesInt } from '../../interfaces/device-interface.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {AddDeviceListComponent} from "./add-device-list/add-device-list.component";
import {AeInterfaceComponent} from "./ae-interface/ae-interface.component";
//import { ModalDirective } from 'ng2-bootstrap/modal';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  devices: IDevices[] =[];
  interfaces: IDevicesInt[]=[];
  deviceId: number;
  deviceName: string;
  deviceIp: string;
  selectedDevice: string;
  interfaceData: string;
  noOfDevices: number = 0;
  noOfInterfaces: number = 0;

  rForm: FormGroup;
  interfaceName: string;
  interfaceDesc: string;
  interfaceIp: string;
  validMsg: string = 'This field is required';
  validIpMsg: string = 'Required IP Address is not correct';
  interfaceDetails:any;
  postData: string;

  deviceForm: FormGroup;
  deviceDetails:any;
  deviceData: string;

  editForm: FormGroup;
  einterfaceName: string;
  einterfaceDesc: string;
  einterfaceIp: string;
  einterfaceDetails:any;
  editData: string;
  ipValid = "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";

  overview = true;
  deviceList = false;
  closeResult=''



  constructor( private dataService: DataService, private fb: FormBuilder, private modalService: NgbModal ) {
    this.rForm = fb.group({
      'interfaceName' : [null, Validators.required],
      'interfaceDesc' : [null, Validators.required],
      'interfaceIp' : [null, Validators.compose([Validators.required, Validators.pattern(this.ipValid)])]
    });
    this.deviceForm = fb.group({
      'deviceName' : [null, Validators.required],
      'deviceIp' : [null, Validators.compose([Validators.required, Validators.pattern(this.ipValid)])]
    });
    this.editForm = fb.group({
      'einterfaceName' : [null, Validators.required],
      'einterfaceDesc' : [null, Validators.required],
      'einterfaceIp' : [null, Validators.compose([Validators.required, Validators.pattern(this.ipValid)])]
    });
  }

  ngOnInit() {
    //show devices on init
    this.dataService.getDevices().subscribe(
      (devices) => {this.devices = devices},
      error => alert(error),
      () => console.log("devices populated...")
      );

  }

  addDeviceModal() {
    const modalRef = this.modalService.open(AddDeviceListComponent);
  }

  addInterfaceModal(id: number){
    const modalRef = this.modalService.open(AeInterfaceComponent);
    modalRef.componentInstance.id = id;
  }
  editInterfaceModal(id:number){
    const modalRef = this.modalService.open(AeInterfaceComponent);
    modalRef.componentInstance.id = id;
  }



  //Show Interfaces
  showInterfaces(id:number,name:string){
    this.overview = false;
    this.deviceList = true;

    this.dataService.getInterfaces(id).subscribe(

      (interfaces) => {this.interfaces = interfaces} ,
      error => alert(error),
      () => this.noOfInterfaces = this.interfaces.length.valueOf()
      );
    this.deviceId = id;
    this.deviceName = name;
    this.selectedDevice = name;
  }

  //Show Overview
  showOverview(){
    this.selectedDevice = '';
    this.deviceList = false;
    this.overview = true;
  }


  //Add Device
  addDevice(deviceDetailsPost:any){

    this.deviceName = deviceDetailsPost.deviceName;
    this.deviceIp = deviceDetailsPost.deviceIp;

    this.deviceDetails = {loopback: this.deviceIp, name: this.deviceName};

    this.dataService.postDevices(this.deviceDetails).subscribe(

      resp => this.deviceData = JSON.stringify(resp),
      error => alert(error),
      () =>

      this.dataService.getDevices().subscribe(
        (devices) => {this.devices = devices} ,
        error => alert(error),
        () => this.rForm.reset()
      )
    );
  }

  // Remove Devices

  /*removeDevices(id:number){
    this.dataService.deleteDevices(id).subscribe(
      (devices) => this.deviceData = devices),
      () => this.dataService.getDevices(this.deviceId).subscribe(
        (devices) => {this.deviceData = devices}, error => alert(error),
        () => this.noOfDevices = this.devices.length.valueOf()
      );
      console.log(this.devices);
  }*/

  //Delete Interface
  removeInterface(id:number){
    this.dataService.deleteInterface(id).subscribe(
      interfaces => this.interfaceData = interfaces,
      error => alert(error), () => this.dataService.getInterfaces(this.deviceId).subscribe(
        (interfaces) => {this.interfaces = interfaces}, error => alert(error),
        () => this.noOfInterfaces = this.interfaces.length.valueOf()
      )
      );
  }



}


