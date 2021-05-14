import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProvinceList } from "../constants.js";
import { DSFormService } from "../services/dsform.service"
// import { FormModel } from "../form.model";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  provinces = ProvinceList;
  submitted = false;
  ifRegisterSuccessful = false;
  ifEmailExists = false;

  registrationForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    userEmail: ['', Validators.required],
    registerDate: ['', Validators.required],
    province: ['', Validators.required],
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });

  constructor(
    private fb: FormBuilder,
    private dsformService: DSFormService
    // private model: FormModel
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.ifRegisterSuccessful = false;
    console.log('newSubmit');
    let p = new Promise((resolve, reject) => {
      this.dsformService.findbyEmail(this.registrationForm.value.userEmail)
      .subscribe(data =>{
        this.submitted = true;
        this.ifEmailExists = true
        resolve(this.ifEmailExists)
      },
      error => {
        this.ifEmailExists = false;
        reject(error);
      });
    });

    p.then(exists => {
       console.log("record already exists.");
    })
    .catch(msg => {
      console.log("new record");
        const dataset = {
          firstName: this.registrationForm.value.firstName,
          lastName: this.registrationForm.value.lastName,
          date: this.registrationForm.value.registerDate,
          email: this.registrationForm.value.userEmail,
          location: this.registrationForm.value.province
        }

        this.dsformService.create(dataset)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
            this.successfulRegister()
          },
          error => {
            console.log(error);
          }
        );
    })
  }

  clearForm() {
    console.log("Form cleared");
    this.ifRegisterSuccessful = false;
    this.submitted = false;
    this.ifEmailExists = false;
    this.registrationForm.reset();
  }

  successfulRegister() {
    console.log("Register successful");
    this.ifRegisterSuccessful = true;
  }

  formVerify() {
    if (
      this.registrationForm.valid
    ) {
      return true;
    } else {
      return false;
    }
  }

}

