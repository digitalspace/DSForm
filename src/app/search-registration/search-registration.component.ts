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
    this.dsformService.findbyEmail(this.lookupForm.value.searchEmail)
    .subscribe(data =>{
      this.submitted = true;
      if (!data || !data[0]){
        this.isRegistrationFound = false;
      } else {
        this.isRegistrationFound = true;

        this.firstName = data[0].firstName;
        this.lastName = data[0].lastName;
        this.registrationDate = data[0].date;
        this.userEmail = data[0].email;
        this.province = data[0].location;
      }
      console.log(data);
    },
    error => {
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
      if(!data || !data[0]){
        console.log("unsuccessful delete")
      } else {
        console.log(`record id : ${data[0]._id}`)
        this.dsformService.delete(data[0]._id)
        .subscribe(data =>{
          this.successfulUnregister = true;
        },
        error => {
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
