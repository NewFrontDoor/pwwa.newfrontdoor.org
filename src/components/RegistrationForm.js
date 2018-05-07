/* eslint-disable */

import React, { Component } from 'react';
import _ from 'lodash';
import validator from 'validator';
import {escape} from 'he'
import {Table} from 'react-bootstrap';

import PaypalConfirmation from './confirmations/Paypal';
import ChequeDDConfirmation from './confirmations/ChequeDD';

//import {postToWebform} from '../../fetchJSON.js';

const fullWeekendEarlyPrice = 130;
const fullWeekendPrice = 140;
const currentFullCost = fullWeekendEarlyPrice;
const dayPrice = 20;
const breakfastCost = 9;
const lunchCost = 16;
const dinnerCost = 19

class RegistrationForm extends Component {

  constructor(){
    super();
    this.state = {firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  address: "",
                  suburb: "",
                  state: "",
                  postcode: "",
                  church: "",
                  dietary: "",
                  comments: "",
                  formErrorMessage: "",
                  formValid: false,
                  formSubmitted: false,
                  registrationType: "full",
                  paymentType: "paypal",
                  totalCost: 0,
                  friday: false,
                  fridayDinner: false,
                  saturday: false,
                  saturdayBreakfast: false,
                  saturdayLunch: false,
                  saturdayDinner: false,
                  sundayBreakfast: false,
                  sundayLunch: false}

    this.resetRegistrationForm = this.resetRegistrationForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  resetRegistrationForm(){
    this.setState({firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  address: "",
                  suburb: "",
                  state: "",
                  postcode: "",
                  church: "",
                  dietary: "",
                  comments: "",
                  formErrorMessage: "",
                  formValid: false,
                  formSubmitted: false,
                  registrationType: "full",
                  paymentType: "paypal",
                  totalCost: 0,
                  friday: false,
                  fridayDinner: false,
                  saturday: false,
                  saturdayBreakfast: false,
                  saturdayLunch: false,
                  saturdayDinner: false,
                  sundayBreakfast: false,
                  sundayLunch: false})
  }

  toggleCheckbox(e){
    var change = {};
    change[e.target.name] = e.target.checked;
    this.setState(change);
    console.log(this.state);
  }

  handleChange(e) {
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    var change = {};
    change[e.target.name] = value;
    this.setState(change);
    console.log(this.state)
  }

  handleSubmit(e) {
    e.preventDefault();
    var errorMessage = "";
    let totalCost = 0;

    if(validator.isEmpty(this.state.firstName))
    {
      errorMessage += "Please enter your first name.\n";
    }
    if(validator.isEmpty(this.state.lastName))
    {
      errorMessage += "Please enter your last name.\n";
    }
    if(validator.isEmpty(this.state.email) || !validator.isEmail(this.state.email))
    {
      errorMessage += "Please enter a valid email address.\n";
    }
    if(validator.isEmpty(this.state.phone))
    {
      errorMessage += "Please enter a phone number.\n";
    }
    if(validator.isEmpty(this.state.address))
    {
      errorMessage += "Please enter your address.\n";
    }
    if(validator.isEmpty(this.state.suburb))
    {
      errorMessage += "Please enter your suburb.\n";
    }
    if(validator.isEmpty(this.state.state))
    {
      errorMessage += "Please enter your state.\n";
    }
    if(validator.isEmpty(this.state.postcode))
    {
      errorMessage += "Please enter your postcode.\n";
    }
    if(validator.isEmpty(this.state.dietary))
    {
      errorMessage += "Please enter your dietary requirements.\n";
    }
    if(validator.isEmpty(this.state.comments))
    {
      errorMessage += "Please enter any relevant comments you may have\n";
    }


    if(errorMessage !== "")
    {
      this.setState({formErrorMessage:errorMessage});
      return false;
    }
    else
    {
      if(this.state.registrationType !== "full"){
        //sum total cost
        if(this.state.friday){totalCost += dayPrice;}
        if(this.state.saturday){totalCost += dayPrice;}
        if(this.state.sunday){totalCost += dayPrice;}

        if(this.state.fridayDinner){totalCost += dinnerCost}
        if(this.state.saturdayBreakfast){totalCost += breakfastCost}
        if(this.state.saturdayLunch){totalCost += lunchCost}
        if(this.state.saturdayDinner){totalCost += dinnerCost}
        if(this.state.sundayBreakfast){totalCost += breakfastCost}
        if(this.state.sundayLunch){totalCost += lunchCost}


      }
      else{
        totalCost = currentFullCost;
      }
      this.setState({totalCost:totalCost});
      this.setState({formValid:true});
      this.setState({formSubmitted:true});
      console.log(this.state);
      /*handle posting to drupal and show success message
      var form = new FormData();
      form.append("webform", "8534998e-a5f0-4375-8586-6c479a456f1e");
      form.append("submission[data][1][values][0]", escape(this.state.name));
      form.append("submission[data][2][values][0]", escape(this.state.email));
      form.append("submission[data][3][values][0]", escape(this.state.phone));
      form.append("submission[data][24][values][0]", escape(this.state.allergies));
      form.append("submission[data][25][values][0]", escape(this.state.comments));
      var that = this;
      postToWebform(form, function(data){
        that.setState({submissionID:data.sid})
        that.setState({formSubmitted:true})
      })*/
    }

  }

  render() {

    var requiredField = (<span className="form-required" title="This field is required.">*</span>);
    var registrationForm;
    var registrationsOpen = true;
    if(!this.state.formValid && registrationsOpen){
      registrationForm = (
        <section>
          <p>Friday 21st – Sunday 23rd September 2018<br/>
          Camp Clayton, Ulverston</p>

          <p>Registrations Close 2nd September 2018</p>

          <br />
          <form onSubmit={this.handleSubmit}>

            <h3 style={{color: "#a3c95c"}}>Contact Information</h3>

            <label>First Name </label>{requiredField}
            <input className="form-control form-text required" type="text" name="firstName" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.firstName} />

            <label>Last Name </label>{requiredField}
            <input className="form-control form-text required" type="text" name="lastName" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.lastName} />

            <label>Email </label>{requiredField}
            <input className="form-control form-text required" type="text" name="email" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.email} />

            <label>Phone Number </label>{requiredField}
            <input className="form-control form-text required" type="text" name="phone" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.phone} />

            <label>Address </label>{requiredField}
            <input className="form-control form-text required" type="text" name="address" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.address} />

            <label>Suburb </label>{requiredField}
            <input className="form-control form-text required" type="text" name="suburb" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.suburb} />

            <label>State </label>{requiredField}
            <input className="form-control form-text required" type="text" name="state" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.state} />

            <label>Postcode </label>{requiredField}
            <input className="form-control form-text" type="text" name="postcode" size="4" maxLength="4" onChange={this.handleChange.bind(this)} value={this.state.postcode} />

            <h3 style={{color: "#a3c95c"}}>Registration Information</h3>

            <label><strong>Registration Type</strong></label>{requiredField}<br/>

            <select name="registrationType" value={this.state.registrationType} onChange={this.handleChange.bind(this)}>
              <option value="full">Full Weekend - ${currentFullCost}</option>
              <option value="day">Day Visitor - ${dayPrice} per day</option>
            </select>
            <br /><br />

              {this.state.registrationType === "full" ? (<section>
                <strong>Will you be attending the Friday night dinner? </strong><br />
                <label> Yes &nbsp;</label><input type="radio" name="weekendDinnerAttendance" value="yes" onChange={this.handleChange.bind(this)} checked={this.state.weekendDinnerAttendance === "yes"}/><br />
                <label> No &nbsp;</label><input type="radio" name="weekendDinnerAttendance" value="no" onChange={this.handleChange.bind(this)} checked={this.state.weekendDinnerAttendance === "no"}/><br />
              </section>) : (
              <section><strong>Please select which days you will be attending:</strong><br />
                <label><input type="checkbox" name="friday" value={this.state.friday} onChange={this.toggleCheckbox.bind(this)} /> &nbsp;Friday </label><br />
                <label><input type="checkbox" name="saturday" value={this.state.saturday} onChange={this.toggleCheckbox.bind(this)} /> &nbsp;Saturday </label><br />
                <label><input type="checkbox" name="sunday" value={this.state.sunday} onChange={this.toggleCheckbox.bind(this)}/> &nbsp;Sunday </label><br />
                <strong>Please select which meals will be required:</strong><br />
                <strong>Friday</strong> <br/>
                  <input type="checkbox" name="fridayDinner" value={this.state.fridayDinner} onChange={this.toggleCheckbox.bind(this)} />&nbsp;Dinner ($19)<br />
                <strong>Saturday</strong><br/>
                  <input type="checkbox" name="saturdayBreakfast" value={this.state.fridayDinner} onChange={this.toggleCheckbox.bind(this)} />&nbsp;Breakfast ($9)&nbsp;
                  <input type="checkbox" name="saturdayLunch" value={this.state.saturdayLunch} onChange={this.toggleCheckbox.bind(this)}/>&nbsp;Lunch ($16)&nbsp;
                  <input type="checkbox" name="saturdayDinner" value={this.state.saturdayDinner} onChange={this.toggleCheckbox.bind(this)}/>&nbsp;Dinner ($19)&nbsp;<br />
                <strong>Sunday</strong><br/>
                  <input type="checkbox" name="sundayBreakfast" value={this.state.saturdayDinner} onChange={this.toggleCheckbox.bind(this)} />&nbsp;Breakfast ($9)&nbsp;
                  <input type="checkbox" name="sundayLunch" value={this.state.sundayLunch} onChange={this.toggleCheckbox.bind(this)} />&nbsp;Lunch ($16)&nbsp;<br />
                <br />
              </section>)}

              <label><strong>Payment Method</strong></label>{requiredField} <br/>
              <select name="paymentType" value={this.state.paymentType} onChange={this.handleChange.bind(this)}>
                <option value="paypal">Paypal or Credit Card</option>
                <option value="cheque">Cheque</option>
                <option value="directDeposit">Direct Deposit</option>
              </select><br /><br />

            <label>Church </label><br/>
            <input className="form-control form-text required" type="text" name="church" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.church} />


            <label>
              Dietary Requirements {requiredField} </label><br/>
                <textarea name="dietary" cols="90" rows="5" onChange={this.handleChange.bind(this)} value={this.state.dietary} />
                <br/>
                <span style={{fontSize: "14px"}}>Please write N/A if none</span>
                <br/><br/>

            <label>
              Other Comments {requiredField}</label><br/>
              <textarea name="comments" cols="90" rows="5" onChange={this.handleChange.bind(this)} value={this.state.comments} />
            <br/>
            <span style={{fontSize: "14px"}}>
              Please answer the following questions and add any other comments that you would like to pass onto the organisers.<br />
              <ul>
              <li>Please list a few of your favourite hymns/songs</li>
              <li>Do you have a roommate request?</li>
              <li>Do you need help with transport or are interested in carpooling?</li>
              </ul>
            </span>
            <br/><br/>

            <input type="submit" value="Register" className="btn btn-primary"/>

            <br/><br/>
            <div id="errorMessage" style={{whiteSpace: "pre-line", fontWeight: "bold"}}>
              {this.state.formErrorMessage}
            </div>
          </form>
        </section>
      );
    }
    else if (!this.state.formValid && !registrationsOpen){
      registrationForm = (
        <section>
        <p>Friday 21st – Sunday 23rd September 2018<br/>
        Camp Clayton, Ulverston</p>

        <p>Registrations Close 2nd September 2018</p>

          <p className="lead">Registrations for Women&apos;s Week Away 2018 have now closed.</p>
        </section>
    )
    }
    else
    {
      registrationForm = <div></div>
    }

    var formSubmitted;
    if(this.state.formSubmitted)
    {
      formSubmitted = ( <div>
                          {this.state.paymentType === "paypal" ? <PaypalConfirmation /> : <ChequeDDConfirmation totalCost={this.state.totalCost} surname={this.state.lastName}/>}


                      <strong>[THE PAYMENT EMAIL FOR THE CHEQUE/DD OPTIONS]</strong>
                      <br />
                      <br />SUBJECT: Registration and Payment for Women&apos;s Weekend Away
                      <br />Dear [NAME],
                      Thank you for registering for the Women&apos;s Weekend Away, hosted by the Presbyterian Church of Tasmania.
                      Please note that your registration for WWA is not complete until payment has been received.
                      To complete your registration, please pay the full amount of $[00]
                      using one of the following methods:
                      Direct Deposit:
                      Account Name: Presbyterian Church of Australia
                      BSB: 067 002
                      Account No: 28029739
                      Reference: WWA (Your Surname)
                      Cheque:
                      Please make your cheque payable to 'Presbyterian Church of Tasmania' and then post it to:
                      Katinka Clack
                      5 Alicia Road
                      Kingston TAS 7050
                      For information about the conference, please visit the website here, or follow the updates on  [Links to landing page that NFD set up with brochure info]
                      If you have any questions, please don&apos;t hesitate to contact me.
                      Look forward to seeing you there.
                      God bless,
                      Cristiane Baker
                      Camp Coordinator
                      •	what text would you like in an automated email sent to people when they complete registration?
                      <br /><br />
                      <strong>[DRAFT INFORMATION EMAIL TO ALL REGISTRANTS]</strong><br />
                      <br />
                      SUBJECT: Thank you for Registering for Women&apos;s Weekend Away<br />

                      Hi [NAME],

                      We&apos;re looking forward to ...


                      What to Bring

                      Saturday Night Dinner Theme

                      Pray

                      Registrations will be open from 4:30pm and some of us will be there from about 4pm setting up.

                      Looking forward to seeing you at camp.

                      Blessings
                      Cristiane Baker

                      <br /><br />
                      <input type="button" onClick={this.resetRegistrationForm} value="Register Somebody Else?" className="btn btn-primary"/>
                      </div>);
    }
    else {
      formSubmitted = "";
    }

    return (
        <section>
          <br />
          <section className="container">
            {formSubmitted}
            {registrationForm}


          </section>
        </section>
    );
  }
}

export default RegistrationForm;
