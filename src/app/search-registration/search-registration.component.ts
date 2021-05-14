import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DSFormService } from '../services/dsform.service';

@Component({
  selector: 'app-search-registration',
  templateUrl: './search-registration.component.html',
  styleUrls: ['./search-registration.component.css']
})
export class SearchRegistrationComponent implements OnInit {
  isRegistrationFound = false;
  submitted = false;
  successfulUnregister = false;

  firstName: String = '';
  lastName: String = '';
  registrationDate: any = '';
  userEmail: String = '';
  province: String = '';

  lookupForm = this.fb.group({
    searchEmail: ['', Validators.required],
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });

  constructor(
    private fb: FormBuilder,
    private dsformService: DSFormService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.successfulUnregister = false;
    this.submitted = true;
    this.dsformService.findbyEmail(this.lookupForm.value.searchEmail)
    .subscribe(data =>{
      if (!data){
        this.isRegistrationFound = false;
      } else {
        this.isRegistrationFound = true;

        this.firstName = Object(data).firstName;
        this.lastName = Object(data).lastName;
        this.registrationDate = Object(data).date;
        this.userEmail = Object(data).email;
        this.province = Object(data).location;
      }
    },
    error => {
      this.isRegistrationFound = false;
      console.log(error);
    }
    );
    // not yet implemented
    console.log('onSubmit activated');
    // console.log(`isRegistrationFound ${this.checkRegistration()}`)
    // this.toggleRegistration();
  }

  isEmailValid(){
    if(this.lookupForm.valid){
      return true;
    }
  }

  checkUnregister(){
    if (confirm("Are you sure you want to unregister?")){
      this.unregister();
      this.clearForm();
      this.successfulUnregister = true;
      this.submitted = false;
    }
  }

  unregister(){
    // implement
    this.dsformService.findbyEmail(this.lookupForm.value.searchEmail)
    .subscribe(data => {
      if(!data){
        console.log("unsuccessful unregister")
      } else {
        console.log(`record id : ${Object(data)._id}`)
        this.dsformService.delete(Object(data)._id)
        .subscribe(data =>{
          this.successfulUnregister = true;
          console.log('successfully unregistered')
        },
        error => {
          console.log('unsuccessful unregister');
          console.log(error);
        })
      }
    },
    error =>{
      console.log(error);
    })
  }

  checkRegistration(){
    return this.isRegistrationFound ? true : false; 
  }

  clearForm(){
    this.isRegistrationFound = false;
    this.lookupForm.reset();
    
  }

  toggleRegistration(){
    // test function
    this.isRegistrationFound = !this.isRegistrationFound;
  }

}
