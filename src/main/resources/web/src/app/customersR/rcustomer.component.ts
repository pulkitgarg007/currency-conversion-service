import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators , FormBuilder, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { Customer } from '../customers//customer';
import { debounceTime } from 'rxjs/operators';

function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean} | null => {
  if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)){
      return { range: true};
    }
  return null;
  };
}

function dateCompare(c: AbstractControl): {[key: string]: boolean} |null{
  if ( c.get('email').pristine ||  c.get('confirmEmail').pristine){
    return null;
  }
  if ( c.get('email').value === c.get('confirmEmail').value){
    return null;
  }
  return { match: true};
}

@Component({
  selector: 'app-rcustomer',
  templateUrl: './rcustomer.component.html',
  styleUrls: ['./rcustomer.component.css']
})
export class CustomerRComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();
  emailMessage: any;
  confirmEmailMessage: any;
  private validationMessages = {
    required: 'Please enter an Email Address.',
    email: 'Please enter a valid Email Address.'
  };

   private confirmEmailValidationMessages = {
    required: 'Please enter an Email Address.',
    match: 'Please enter correct confirm Email Address.'
  };

  get addresses(): FormArray{
    return  this.customerForm.get('addresses') as FormArray;
  }
  addAddress(): void{
    this.addresses.push(this.buildAddress());
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: ['', [ Validators.required, Validators.minLength(3)]],
      lastName: ['', [ Validators.required, Validators.minLength(5)]],
      emailGroup: this.fb.group({
        email: ['', [ Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required],
      }, { validators: dateCompare}),
      phone: '',
      notification: 'email',
      rating: [null, ratingRange(1, 5)],
      sendCatalog: true,
      addresses: this.fb.array([this.buildAddress()])
    });

    this.customerForm.get('notification').valueChanges.subscribe (
      value => this.setNotification(value)
    );
    const emailFormControl =  this.customerForm.get('emailGroup.email');
    emailFormControl.valueChanges.pipe(debounceTime(1000)).subscribe(
      value => this.setEMessage(emailFormControl)
    );
    const confirmEmailFormControl =  this.customerForm.get('emailGroup.confirmEmail');
    confirmEmailFormControl.valueChanges.subscribe(
      value => this.setCEMessage(confirmEmailFormControl )
    );

  }
    buildAddress(): FormGroup {
      return this.fb.group({
        addressType: 'home',
        streetAddress1: '',
        streetAddress2: '',
        city: '',
        state: '',
        zipCode: ''
      });
    }
  setEMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.dirty || c.touched) && c.errors){
      this.emailMessage = Object.keys(c.errors).map(
        key => this.validationMessages[key]
      );
    }
  }

    setCEMessage(c: AbstractControl): void {
    this.confirmEmailMessage = '';
    if ((c.dirty || c.touched) && c.errors){
      this.confirmEmailMessage = Object.keys(c.errors).map(
        key => this.confirmEmailValidationMessages[key]).join(' ');
    }
  }


  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone');
    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  populateTestData(): void {
    this.customerForm.patchValue({
      firstName: 'Jack',
      lastName: 'Harkness',
      email: 'jack@Lorchwood.com',
      sendCatalog: false
    });
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }
}
