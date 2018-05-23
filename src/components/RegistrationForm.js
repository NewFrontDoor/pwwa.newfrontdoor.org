/* eslint-disable */

import React, { Component } from 'react';
import _ from 'lodash';
import validator from 'validator';
import {escape} from 'he'
import {Table} from 'react-bootstrap';

import PaypalConfirmation from './confirmations/Paypal';
import ChequeDDConfirmation from './confirmations/ChequeDD';

import {postToWebform} from './postToAPI.js';

const fullWeekendEarlyPrice = 130;
const fullWeekendPrice = 140;
const currentFullCost = fullWeekendEarlyPrice;
const dayPrice = 20;
const breakfastCost = 9;
const lunchCost = 16;
const dinnerCost = 19
const registrationsOpen = true;

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
                  registrationType: "earlyBird",
                  paymentType: "cheque",
                  totalCost: 0,
                  friday: false,
                  fridayDinner: false,
                  saturday: false,
                  saturdayBreakfast: false,
                  saturdayLunch: false,
                  saturdayDinner: false,
                  sundayBreakfast: false,
                  sundayLunch: false,
                  weekendDinnerAttendance: 'yes'}

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
                  registrationType: "earlyBird",
                  paymentType: "cheque",
                  totalCost: 0,
                  friday: false,
                  fridayDinner: false,
                  saturday: false,
                  saturdayBreakfast: false,
                  saturdayLunch: false,
                  saturdayDinner: false,
                  sundayBreakfast: false,
                  sundayLunch: false,
                  weekendDinnerAttendance: 'yes'})
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
      errorMessage += "Please select your state.\n";
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
      if(this.state.registrationType === "day"){
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
      //Price for full registration if using both options
      else{
        //not having multiple options: totalCost = currentFullCost;
        if(this.state.registrationType === "earlyBird")
        {
          totalCost = fullWeekendEarlyPrice;
        }
        else{
          totalCost = fullWeekendPrice;
        }

      }
      this.setState({totalCost:totalCost});
      this.setState({formValid:true});
      console.log(this.state);
      /*handle posting to drupal and show success message*/
      var form = new FormData();
      form.append("webform", "8e070048-9aaf-4371-a0de-35bb5c3d28e6");
      form.append("submission[data][1][values][0]", escape(this.state.firstName));
      form.append("submission[data][2][values][0]", escape(this.state.lastName));
      form.append("submission[data][3][values][0]", escape(this.state.email));
      form.append("submission[data][4][values][0]", escape(this.state.phone));
      form.append("submission[data][5][values][0]", escape(this.state.address));
      form.append("submission[data][6][values][0]", escape(this.state.suburb));
      form.append("submission[data][7][values][0]", escape(this.state.state));
      form.append("submission[data][8][values][0]", escape(this.state.postcode));
      form.append("submission[data][9][values][0]", escape(this.state.registrationType));



      if(this.state.registrationType === 'full' || this.state.registrationType === 'earlyBird'){
        form.append("submission[data][10][values][0]", escape(this.state.weekendDinnerAttendance));
        form.append("submission[data][11][values][0]", 'friday');
        form.append("submission[data][11][values][1]", 'saturday');
        form.append("submission[data][11][values][2]", 'sunday');

        if(this.state.weekendDinnerAttendance)
        {
          form.append("submission[data][12][values][0]", 'fridayDinner');
          form.append("submission[data][12][values][1]", 'saturdayBreakfast');
          form.append("submission[data][12][values][2]", 'saturdayLunch');
          form.append("submission[data][12][values][3]", 'saturdayDinner');
          form.append("submission[data][12][values][4]", 'sundayBreakfast');
          form.append("submission[data][12][values][5]", 'sundayLunch');
        }
        else{
          form.append("submission[data][12][values][0]", 'saturdayBreakfast');
          form.append("submission[data][12][values][1]", 'saturdayLunch');
          form.append("submission[data][12][values][2]", 'saturdayDinner');
          form.append("submission[data][12][values][3]", 'sundayBreakfast');
          form.append("submission[data][12][values][4]", 'sundayLunch');
        }


      }
      else{
        let i = 0;
        if(this.state.friday)
        {
          form.append("submission[data][11][values]["+i+"0]", 'friday');
          i++;
        }
        if(this.state.saturday)
        {
          form.append("submission[data][11][values]["+i+"0]", 'saturday');
          i++;
        }
        if(this.state.sunday)
        {
          form.append("submission[data][11][values]["+i+"0]", 'sunday');
          i++;
        }

        let j = 0;
        if(this.state.fridayDinner){
          form.append("submission[data][12][values]["+j+"]", 'fridayDinner');
          form.append("submission[data][10][values][0]", 'yes');
          j++;
        }
        else{
          form.append("submission[data][10][values][0]", 'no');
        }
        if(this.state.saturdayBreakfast){
          form.append("submission[data][12][values]["+j+"]", 'saturdayBreakfast');
          j++;
        }
        if(this.state.saturdayLunch){
          form.append("submission[data][12][values]["+j+"]", 'saturdayLunch');
          j++;
        }
        if(this.state.saturdayDinner){
          form.append("submission[data][12][values]["+j+"]", 'saturdayDinner');
          j++;
        }
        if(this.state.sundayBreakfast){
          form.append("submission[data][12][values]["+j+"]", 'sundayBreakfast');
          j++;
        }
        if(this.state.sundayLunch){
          form.append("submission[data][12][values]["+j+"]", 'sundayLunch');
          j++;
        }
      }

      form.append("submission[data][13][values][0]", escape(this.state.paymentType));
      form.append("submission[data][14][values][0]", escape(this.state.church));
      form.append("submission[data][15][values][0]", escape(this.state.dietary));
      form.append("submission[data][16][values][0]", escape(this.state.comments));
      form.append("submission[data][17][values][0]", totalCost);
      var that = this;
      postToWebform(form, function(data){
        that.setState({submissionID:data.sid})
        that.setState({formSubmitted:true})
      })
    }

  }

  render() {

    var requiredField = (<span className="form-required" title="This field is required.">*</span>);
    var registrationForm;
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

            {/*}<label>State </label>{requiredField}
            <input className="form-control form-text required" type="text" name="state" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.state} />
*/}
            <label>State</label>{requiredField}<br/>
            <select name="state" value={this.state.state} onChange={this.handleChange.bind(this)}>
            <option value="">----</option>
              <option value="act">Australian Capital Territory</option>
              <option value="nsw">New South Wales</option>
              <option value="nt">Northern Territory</option>
              <option value="qld">Queensland</option>
              <option value="sa">South Australia</option>
              <option value="tas">Tasmania</option>
              <option value="wa">Western Australia</option>
            </select><br /><br />

            <label>Postcode </label>{requiredField}
            <input className="form-control form-text" type="text" name="postcode" size="4" maxLength="4" onChange={this.handleChange.bind(this)} value={this.state.postcode} />

            <h3 style={{color: "#a3c95c"}}>Registration Information</h3>

            <label><strong>Registration Type</strong></label>{requiredField}<br/>

            <select name="registrationType" value={this.state.registrationType} onChange={this.handleChange.bind(this)}>
              <option value="earlyBird">Full Weekend Early Bird - ${fullWeekendEarlyPrice}</option>
              <option value="full">Full Weekend - ${fullWeekendPrice}</option>
              <option value="day">Day Visitor - ${dayPrice} per day</option>
            </select>
            <br /><br />

              {this.state.registrationType === "full" || this.state.registrationType === "earlyBird" ? (<section>
                <strong>Will you be attending the Friday night dinner? </strong><br />
                <label> Yes &nbsp;</label><input type="radio" name="weekendDinnerAttendance" value="yes" onChange={this.handleChange.bind(this)} checked={this.state.weekendDinnerAttendance === "yes"}/><br />
                <label> No &nbsp;</label><input type="radio" name="weekendDinnerAttendance" value="no" onChange={this.handleChange.bind(this)} checked={this.state.weekendDinnerAttendance === "no"}/><br />
              </section>) : (
              <section><strong>Please select which days you will be attending:</strong><br />
                <label><input type="checkbox" name="saturday" value={this.state.saturday} onChange={this.handleChange.bind(this)} /> &nbsp;Saturday </label><br />
                <label><input type="checkbox" name="sunday" value={this.state.sunday} onChange={this.handleChange.bind(this)}/> &nbsp;Sunday </label><br />
                <strong>Please select which meals will be required:</strong><br />
                <strong>Saturday</strong><br/>
                  <input type="checkbox" name="saturdayBreakfast" value={this.state.fridayDinner} onChange={this.handleChange.bind(this)} />&nbsp;Breakfast ($9)&nbsp;
                  <input type="checkbox" name="saturdayLunch" value={this.state.saturdayLunch} onChange={this.handleChange.bind(this)}/>&nbsp;Lunch ($16)&nbsp;
                  <input type="checkbox" name="saturdayDinner" value={this.state.saturdayDinner} onChange={this.handleChange.bind(this)}/>&nbsp;Dinner ($19)&nbsp;<br />
                <strong>Sunday</strong><br/>
                  <input type="checkbox" name="sundayBreakfast" value={this.state.saturdayDinner} onChange={this.handleChange.bind(this)} />&nbsp;Breakfast ($9)&nbsp;
                  <input type="checkbox" name="sundayLunch" value={this.state.sundayLunch} onChange={this.handleChange.bind(this)} />&nbsp;Lunch ($16)&nbsp;<br />
                <br />
              </section>)}

              <label><strong>Payment Method</strong></label>{requiredField} (Paypal Payment Available Soon)<br/>
              <select name="paymentType" value={this.state.paymentType} onChange={this.handleChange.bind(this)}>
                {/*<option value="paypal">Paypal or Credit Card</option>*/}
                <option value="cheque">Cheque</option>
                <option value="directDeposit">Direct Deposit</option>
              </select><br /><br />

            <label>Church </label><br/>
            <input className="form-control form-text required" type="text" name="church" size="60" maxLength="128" onChange={this.handleChange.bind(this)} value={this.state.church} />


            <label>
              Dietary Requirements {requiredField} </label><br/>
                <textarea className="form-control" name="dietary" rows="5" onChange={this.handleChange.bind(this)} value={this.state.dietary} />
                <br/>
                <span style={{fontSize: "14px"}}>Please write N/A if none</span>
                <br/><br/>

            <label>
              Other Comments {requiredField}</label><br/>
              <textarea className="form-control" name="comments" rows="5" onChange={this.handleChange.bind(this)} value={this.state.comments} />
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

          <h3 style={{color: "#a3c95c"}}>Registrations for Women&apos;s Week Away 2018 have now closed.</h3>
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
                          {this.state.paymentType === "paypal" ?
                            <PaypalConfirmation /> :
                            <ChequeDDConfirmation totalCost={this.state.totalCost} surname={this.state.lastName}/>}

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
