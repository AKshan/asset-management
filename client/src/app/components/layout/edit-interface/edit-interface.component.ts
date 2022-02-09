import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DataService} from "../../../services/data.service";
import {IDevicesInt} from "../../../interfaces/device-interface.interface";

@Component({
  selector: 'app-edit-interface',
  templateUrl: './edit-interface.component.html',
  styleUrls: ['./edit-interface.component.scss']
})
export class EditInterfaceComponent implements OnInit {
  @Input() id: number;
  interfaces: IDevicesInt[]=[];
  editForm: FormGroup;
  interfaceName: string;
  interfaceDesc: string;
  interfaceIp: string;
  einterfaceName: string;
  einterfaceDesc: string;
  einterfaceIp: string;
  einterfaceDetails:any;
  editData: string;



  validMsg: string = 'This field is required';
  validIpMsg: string = 'Required IP Address is not correct';
  ipValid = "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";

  constructor(private fb: FormBuilder, private activeModal: NgbActiveModal, private dataService: DataService) {
    this.editForm = fb.group({
      'einterfaceName' : [null, Validators.required],
      'einterfaceDesc' : [null, Validators.required],
      'einterfaceIp' : [null, Validators.compose([Validators.required, Validators.pattern(this.ipValid)])]
    });
  }

  ngOnInit(): void {
  }


  //Edit Interface
  editInterface(einterfaceDetailsPost:any,id:number){
    this.einterfaceName = einterfaceDetailsPost.einterfaceName;
    this.einterfaceDesc = einterfaceDetailsPost.einterfaceDesc;
    this.einterfaceIp = einterfaceDetailsPost.einterfaceIp;

    this.einterfaceDetails = {ipCode: this.einterfaceIp, deviceId: this.id, name: this.einterfaceName, description: this.einterfaceDesc};

    this.dataService.updateInterfaces(this.einterfaceDetails,id).subscribe(

      resp => this.editData = JSON.stringify(resp),
      error => alert(error),
      () =>

        this.dataService.getInterfaces(this.id).subscribe(
          (interfaces) => {this.interfaces = interfaces} ,
          error => alert(error)
        )
    );

  }

  close() {
    this.activeModal.close();
  }

}
