import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../../services/data.service";
import {IDevices} from "../../../interfaces/device.interface";
import {IDevicesInt} from "../../../interfaces/device-interface.interface";

@Component({
  selector: 'app-ae-interface',
  templateUrl: './ae-interface.component.html',
  styleUrls: ['./ae-interface.component.scss']
})
export class AeInterfaceComponent implements OnInit {
  @Input() id: number;
  interfaces: IDevicesInt[]=[];
  deviceId: number;

  rForm: FormGroup;
  interfaceName: string;
  interfaceDesc: string;
  interfaceIp: string;
  interfaceDetails:any;
  interfaceData: string;
  noOfInterfaces: number = 0;


  validMsg: string = 'This field is required';
  validIpMsg: string = 'Required IP Address is not correct';
  ipValid = "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";


  constructor(private fb: FormBuilder, private activeModal: NgbActiveModal, private dataService: DataService) {
    this.rForm = fb.group({
      'interfaceName' : [null, Validators.required],
      'interfaceDesc' : [null, Validators.required],
      'interfaceIp' : [null, Validators.compose([Validators.required, Validators.pattern(this.ipValid)])]
    });
  }

  ngOnInit(): void {
  }

  //Add Interface
  addInterface(interfaceDetailsPost:any, id:number){
    console.log(this.deviceId);

    this.interfaceName = interfaceDetailsPost.interfaceName;
    this.interfaceDesc = interfaceDetailsPost.interfaceDesc;
    this.interfaceIp = interfaceDetailsPost.interfaceIp;
    this.deviceId = id;

    this.interfaceDetails = {ipCode: this.interfaceIp, deviceId: this.deviceId, name: this.interfaceName, description: this.interfaceDesc};

    this.dataService.postInterfaces(this.interfaceDetails).subscribe(

      resp => this.interfaceData = resp,

      error => alert(error),
      () =>

        this.dataService.getInterfaces(this.deviceId).subscribe(
          (interfaces) => {this.interfaces = interfaces} ,
          error => alert(error),
          () => {this.rForm.reset(); this.noOfInterfaces = this.interfaces.length.valueOf();
            console.log(this.deviceId)}
        )
    );

  }

  close() {
    this.activeModal.close();
  }

}
