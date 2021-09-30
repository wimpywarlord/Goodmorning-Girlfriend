<template>
  <div id="app">
    <div v-if="!show_pop_up && !show_pro_pop_up" class="toggleWrapper">
      <input @click="changeTheme" type="checkbox" class="dn" id="dn" />
      <label for="dn" class="toggle">
        <span class="toggle__handler">
          <span class="crater crater--1"></span>
          <span class="crater crater--2"></span>
          <span class="crater crater--3"></span>
        </span>
        <span class="star star--1"></span>
        <span class="star star--2"></span>
        <span class="star star--3"></span>
        <span class="star star--4"></span>
        <span class="star star--5"></span>
        <span class="star star--6"></span>
      </label>
      <br>
      <p v-if="!dark_mode">GoodMorning</p>
      <p v-if="dark_mode">Good Night</p>
    </div>

    <div class="center" :class="{ dark: dark_mode, girl: !dark_mode }">
      <div 
        @click="sendMessage(); showGoodMessage(); "
        class="button center unselectable"
        :class="{ button_dark: dark_mode, button_girl: !dark_mode }"
      >SEND</div>
    </div>
    <div
    style="cursor : pointer;"
    v-b-modal.modal-center
      class="row center bottom_nav"
      :class="{ bottom_nav_dark: dark_mode, bottom_nav_girl: !dark_mode }"
    >
    <a style="color: inherit; text-decoration: none;" target="_blank" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Made with 💖 by Kshitij |  Didn't get the mail ?</a>
    </div>
    <!-- POP UP  -->
    <div class="parent_pop_up" v-if="show_pop_up">
      <div class="pop_up">
        <div class="explain">
          <span>
            “Does your
            <b>friend</b> complain about you not wishing them
            <b>goodmorning</b> or
            <b>goodnight</b> ? Are you loosing the
            <b>spark</b> in your friendship ? Or have you just become too
            <b>lazy</b> to type a
            <b>long</b> message every morning and night?”
            <br />
            <br />Well <b>not anymore</b> ! Get <b>delicately drafted messages</b> on a tap distance away.
            <b>Subscribe to our service</b> for wishing your loved ones everyday,everynight <b>hassle free</b> with no efforts what so ever.
            <br />
            <br />A smarter way to a longlasting friendship.
          </span>
        </div>
        <div class="form">
          <span>
            <img style="margin-bottom: 4px !important;" v-b-popover.hover.top="'In case you want to see what kind of greeting will sent to your loved one. You can enter your own email below and test our service. If you like it, subscribe it for 2 weeks.'" title="Test our service." class="tool_tip_logo" src="https://image.flaticon.com/icons/svg/906/906794.svg" alt="">
            <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                type="email"
                v-model="email_of_user"
                required
                placeholder="Enter email for testing."
              ></b-form-input>
            </b-form-group>
            <br />
            <b-button @click="emailCheck"
              class="submit_email_button"
              value="submit"
              type="button" variant="dark">Test</b-button>
          </span>
        </div>
      </div>
    </div>
    <div class="wrong_email_message_box" v-if="show_wrong_email_message">
      <div class="wrong_email_message">
        <img
          height="100px"
          width="100px"
          src="https://image.flaticon.com/icons/svg/595/595067.svg"
          alt
        />
        <br />Enter a correct Email address.
      </div>
    </div>
    <div class="good_email_message_box" v-if="show_good_message ">
      <div class="good_email_message">
        <img
          height="100px"
          width="100px"
          src="https://image.flaticon.com/icons/svg/595/595067.svg"
          alt
        />
        <br />Email servers are down right now.
      </div>
    </div>

    <!-- FRONT END FOR PRO AND NORMAL VERSION -->
    <div class="box_for_pro_offer" style="color:#283747 ;" v-if="show_pro_pop_up">
      <div class="content_for_pro_offer p-5 center_col">
          <!-- Pro Version -->
          <p style="margin-bottom : 0.8rem !important; font-family: 'Lato', sans-serif;">Get <b>automated messages</b> for 2 weeks , and <b>express your love</b> hassle free.</p>
          <b-form class="pb-3 w-75">
          <b-form-group
              id="input-group-2"
              label="Enter sender's first name."
              label-for="input-2" >
            <b-form-input 
              id="input-2"
              type="text"
              v-model="pro_name_of_sender"
              required
              placeholder="Enter your own First name here."
            ></b-form-input>
          </b-form-group>
          </b-form>
          <b-form class="pb-3 w-75 w-md-50">
          <b-form-group
              id="input-group-1"
              label="Enter email of your loved one."
              label-for="input-1" >
            <b-form-input v-b-popover.hover.top="'On subscribing your loved one will recieve goodmorning and goodnight emails automatically , you dont have to do anything.'" title="Subscribe"
              id="input-1"
              type="email"
              v-model="pro_recep_email"
              required
              placeholder="Enter email of Recipient"
            ></b-form-input>
          </b-form-group>
          </b-form>
          <!-- <b-button @click="emailCheck_pro"   variant="dark">Buy for 2 weeks @ just ₹7. </b-button> -->
          <b-button @click="emailCheckPro" variant="dark">Its free.</b-button>
          <!-- <b-button @click="razor_payment_button"  variant="dark">Buy for 2 weeks @ just ₹7. </b-button> -->
          <!-- <button value="asdasd" @click="razor_payment_button"></button> -->
      </div>
    </div>

    <!-- GO PRO CIRCLE BUTTON -->
      <!-- <div class="parent_for_go_pro_button">
          <div @click="openProPopUp" class="roundbutton" href="#">
              <img class="star_icon" height="40px" width="40px" src="https://image.flaticon.com/icons/png/512/1828/1828614.png" alt="">
          </div>
      </div> -->

    <div class="payment_succesfull_box" v-if="payment_succ_message">
        <div class="message_for_payment_done center_col p-4 text-center" style="border-radius : 4px;">
            <img height="70px"  width="70px" src="https://image.flaticon.com/icons/svg/595/595067.svg" alt="">
            <b>Error</b>
            <span class="p-2"> <b>Due to</b> google's new Oauth policy <b> I am no more able to send emails for free.</b></span>
            <span class=""> <b>Therefore this</b> service <b>is</b> temporarily <b>suspended</b></span>
            <span class="pt-2 pb-3">Until a new version is released.</span> 
        </div>
    </div>

  </div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import axios from "axios";
export default {
  data() {
    return {
      dark_mode: false,
      good_morning: true,
      show_pop_up: true,
      show_wrong_email_message: false,
      show_good_message : false,
      email_of_user: "",
      show_pro_pop_up : false,
      pro_recep_email : "",
      pro_name_of_sender : "",
      payment_succ_message : false,
    };
  },
   mounted() {
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://checkout.razorpay.com/v1/checkout.js')
      recaptchaScript.async = true;
      document.head.appendChild(recaptchaScript)
      let recaptchaScript_2 = document.createElement('script')
      recaptchaScript_2.setAttribute('src', 'https://unpkg.com/axios/dist/axios.min.js')
      recaptchaScript_2.async = true;
      document.head.appendChild(recaptchaScript_2)
    },
  methods: {
    razor_payment_button : function(email_of_lover,name_of_sender) {
      // console.log("PAYMENT BUTTON WAS CLICKED");
      // console.log(email_of_lover);
      // console.log(name_of_sender);
      axios.post('/api/mailList',{
          email: email_of_lover,
          name_of_sender : name_of_sender,
          days: 1
        }).then(response => {
          console.logs(response,"response has come");
        });
        this.show_pro_pop_up =false;
        this.payment_succ_message = true;
    },
    showDocumentation : function() {
      this.show_documentation = true;
    },
    hideDocumentation : function () {
      this.showDocumentation = false;
    },
    showGoodMessage : function () {
        this.show_good_message = true;
        // console.log("Asdsa");
        setTimeout(() => {
          this.show_good_message = false;
          this.show_pro_pop_up = true;
        }, 3000);
        
    },
    openProPopUp : function() {
      this.show_pro_pop_up = true;
    },
    closeProPopUp : function () {
      this.show_pro_pop_up = false;
    },
    emailCheckPro : function () {
        var re_pro = /\S+@\S+\.\S+/;
        // console.log(this.pro_recep_email);
        // console.log(this.pro_name_of_sender);
         if (re_pro.test(this.pro_recep_email)===true) {
          //  console.log("dadsad");
           this.razor_payment_button(this.pro_recep_email,this.pro_name_of_sender);
        }else {
            this.show_wrong_email_message = true;
            setTimeout(() => {
              this.show_wrong_email_message = false;
            }, 2000);
        }
    },
    emailCheck: function() {
      var re = /\S+@\S+\.\S+/;
      if (re.test(this.email_of_user)) {
        this.closePopUp();
      } else {
        this.show_wrong_email_message = true;
        setTimeout(() => {
          this.show_wrong_email_message = false;
        }, 2000);
      }
    },
    closePopUp: function() {
      // console.log("CLOSE BUTTON PRESSED");
      this.show_pop_up = false;
    },
    changeTheme: function() {
      // console.log(this.dark_mode);
      this.dark_mode = !this.dark_mode;
      this.good_morning = !this.good_morning;
      return this.dark_mode;
    },
    sendMessage: function() {
      const url = "/api/posts";
      try {
        axios.post(url, {
          wish: this.good_morning,
          goto_email: this.email_of_user
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
@import url("https://fonts.googleapis.com/css2?family=Anton&display=swap");
*,
div,
body {
  box-sizing: border-box;
  margin: 0px !important;
  padding: 0px;
-webkit-user-select: initial;
      -khtml-user-select: initial;
      -moz-user-select: initial;
      -ms-user-select: initial;
      user-select: initial;
}
body {
  width: 100vw;
  height: 100vh;
}
.message_for_payment_done
{
  width: 60%;
  background-color:#f6ff53 ;
}
.payment_succesfull_box
{
  height: 95vh;
  width: 100vw;
  /* border: 5px solid red; */
  z-index: 7;
  position: absolute;
  top: 0px;
  display: flex;
  justify-content: center;  
  align-items: center;
}
.center_col
{
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}
div {
  /* border: 2px solid red; */
}

.tool_tip_logo
{
  height: 1.6rem;
  width: 1.6rem;
}

/* GO PRO ROUDNDED BUTTOn */
.parent_for_go_pro_button
{
  width: 100vw;
  height: 40vh;
  
  position: absolute ;
  bottom:5%;
  /* border: 5px solid yellow; */
}
.roundbutton{
          cursor: pointer;
          height: 100px;
          width: 100px;
          text-align: center;
          position:absolute;
          bottom:3%;
          right:1%;
          border-radius: 100%;
          display: inline-flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          /* border: 1px solid red; */
          background: #f8a5c2;  /* fallback for old browsers */
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
          transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        }

  .roundbutton:hover{
          height: 100px;
          width: 100px;
          position:absolute;
          bottom:3%;
          right:1%;
          border-radius: 50%;
          /* border: 1px solid red; */
          background: #f8a5c2;  /* fallback for old browsers */
          box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        }
    .roundbutton:active{
          height: 100px;
          width: 100px;
          position:absolute;
          bottom:3%;
          right:1%;
          border-radius: 50%;
          /* border: 1px solid red; */
          background: #f8a5c2;  /* fallback for old browsers */
          -webkit-box-shadow: inset 0px 0px 2px #c1c1c1;
          -moz-box-shadow: inset 0px 0px 2px #c1c1c1;
          box-shadow: inset 0px 0px 2px #c1c1c1;
        }
      
/* GO PRO ROUDNDED BUTTOn */

@media only screen and (max-width: 600px) {
  
    .tool_tip_logo
    {
      height: 1.3rem;
      width: 1.3rem;
    }
    .box_for_pro_offer
    {
      font-size: 0.8rem;
    }
    .roundbutton{
          cursor: pointer;
          height: 70px;
          width: 70px;
          position:absolute;
          bottom:3%;
          right:1%;
          border-radius: 50%;
          /* border: 1px solid red; */
          background: #f8a5c2;  /* fallback for old browsers */
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
          transition: all 0.3s cubic-bezier(.25,.8,.25,1);
          /* border: 1px solid red; */
        }
      .roundbutton:hover{
          height: 70px;
          width: 70px;
          position:absolute;
          bottom:3%;
          right:1%;
          border-radius: 50%;
          /* border: 1px solid red; */
          background: #f8a5c2;  /* fallback for old browsers */
          box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        }
      .roundbutton:active{
          height: 70px;
          width: 70px;
          position:absolute;
          bottom:3%;
          right:1%;
          border-radius: 50%;
          /* border: 1px solid red; */
          background: #f8a5c2;  /* fallback for old browsers */
          -webkit-box-shadow: inset 0px 0px 2px #c1c1c1;
          -moz-box-shadow: inset 0px 0px 2px #c1c1c1;
          box-shadow: inset 0px 0px 2px #c1c1c1;
        }
      .explain {
        font-size: 0.8rem;
        padding-top: 2rem !important;
        padding-right: 2rem !important;
        padding-left: 2rem !important;
        flex: 3;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .bottom_nav {
        height: 5vh;
        font-size: 0.8rem;
        /* border: 2px solid red; */
      } 

}


.close_button_for_pro_box
{
  /* border: 2px solid red; */
  margin: 1.3rem !important;
 
  /* border-radius: 50%; */
  /* display: inline; */
  padding: 0.2rem;
}
.close_button_text
{
   cursor: pointer;
   background-color: rgba(28, 40, 5, 0.4);
   border-radius: 50%; 
   color: white;
   display: inline; 
   padding: 0.7rem;
   background-color: ;
   /* border: 2px solid red; */
}
.close_button_text:hover
{
   cursor: pointer;
   background-color: rgba(28, 40, 5, 0.8);
   border-radius: 50%; 
   color: white;
   display: inline; 
   padding: 0.7rem;
   background-color: ;
   /* border: 2px solid red; */
}
/* PRO OFFER BOX */
.box_for_pro_offer
{
  width: 100vw;
  height: 95vh;
  position: absolute;
  top: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 2px solid red; */
}
.content_for_pro_offer
{
  background-color: #AED6F1 ;
  width: 71%;
  border-radius: 3px;
  text-align: center;
  padding-top: 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}
.razor_pay_button_box
{
  width: 70%;
  background-color: #F0F3F4;
  padding: 0.27rem;
  margin: auto !important;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}
.razor_pay_button_box:hover
{
  cursor: pointer;
  width: 70%;
  background-color: #F0F3F4;
  padding: 0.27rem;
  margin: auto !important;
 box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
.razor_pay_button_box:active {
  -webkit-box-shadow: inset 0px 0px 2px #c1c1c1;
  -moz-box-shadow: inset 0px 0px 2px #c1c1c1;
  box-shadow: inset 0px 0px 2px #c1c1c1;
}

/* ERROR MESSAGE */
.wrong_email_message_box {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 2px solid green; */
}
.good_email_message_box {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  z-index: 3;
  /* border: 2px solid green; */
}
.wrong_email_message {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  display: flex;
  border-radius: 2px;
  padding: 1.5rem;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background-color: #F1948A ;
}
.good_email_message {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  display: flex;
  border-radius: 2px;
  padding: 1.5rem;
  bottom: 100px;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background-color: #fcff40 ;
}

/* SUBMIT EMAIL BUTTOn */
.submit_email_button {
  background: none;
  color: inherit;
  border: none;
  padding: 5px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  width: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.submit_email_button:active {
  -webkit-box-shadow: inset 0px 0px 2px #c1c1c1;
  -moz-box-shadow: inset 0px 0px 2px #c1c1c1;
  box-shadow: inset 0px 0px 2px #c1c1c1;
}

/* POP UP FORM */
.parent_pop_up {
  z-index: 2;
  position: absolute;
  top: 0;
  height: 100vh;
  widows: 100vw;
  /* background-color: rgba(245, 246, 250, 0.3); */
  /* border: 2px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.pop_up {
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  display: flex;
  flex-flow: row wrap;
  background-color: rgba(255, 255, 255, 1);
  width: 70%;
}
.explain {
  padding: 3rem;
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
  padding-bottom: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
  flex: 2;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.bottom_nav_girl {
  background-color: #485460;
  color: #f1f2f6;
}
.bottom_nav_dark {
  background-color: #ced6e0;
  color: #000;
}

.bottom_nav {
    /* border: 5px solid red; */
  height: 5vh;
  /* border: 2px solid red; */
}
.button {
  height: 10rem;
  width: 10rem;
  font-family: "Anton", sans-serif;
  border-radius: 50%;
  cursor: pointer;
  /* border: 2px solid red; */
}
.button_girl {
  background-color: #485460;
  color: #f1f2f6;
  font-size: 2rem;
  box-shadow: 3px 3px rgba(47, 53, 66, 0.4), 6px 6px rgba(47, 53, 66, 0.3),
    9px 9px rgba(47, 53, 66, 0.2), 12px 12px rgba(47, 53, 66, 0.1),
    15px 15px rgba(47, 53, 66, 0.05);
}
.button_dark {
  background-color: #ced6e0;
  color: #2f3542;
  font-size: 2rem;
  box-shadow: 3px 3px rgba(255, 255, 255, 0.4), 6px 6px rgba(255, 255, 255, 0.3),
    9px 9px rgba(255, 255, 255, 0.2), 12px 12px rgba(255, 255, 255, 0.1),
    15px 15px rgba(255, 255, 255, 0.05);
}
.button:active {
  animation-name: raise;
  /* background: #e5e5e5; */
  -webkit-box-shadow: inset 0px 0px 5px #c1c1c1;
  -moz-box-shadow: inset 0px 0px 5px #c1c1c1;
  box-shadow: inset 0px 0px 5px #c1c1c1;
  animation-duration: 0.2s;
  cursor: pointer;
}

@keyframes raise {
  to {
    transform: scale(1.04);
  }
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.dark {
  background-color: #747d8c;
  height: 95vh;
}
.girl {
  background-color: #f1f2f6;
  height: 95vh;
}

.toggleWrapper {
  position: absolute;
  top: 8%;
  left: 50%;
  overflow: hidden;
  padding: 0 100px;
  transform: translate3d(-50%, -50%, 0);
}
.toggleWrapper input {
  position: absolute;
  left: -99em;
}

.toggle {
  cursor: pointer;
  display: inline-block;
  position: relative;
  width: 90px;
  height: 50px;
  background-color: #83d8ff;
  border-radius: 84px;
  transition: background-color 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
}
.toggle:before {
  content: "AM";
  position: absolute;
  left: -50px;
  top: 15px;
  font-size: 18px;
}
.toggle:after {
  content: "PM";
  position: absolute;
  right: -48px;
  top: 15px;
  font-size: 18px;
  color: #749ed7;
}

.toggle__handler {
  display: inline-block;
  position: relative;
  z-index: 1;
  top: 3px;
  left: 3px;
  width: 44px;
  height: 44px;
  background-color: #ffcf96;
  border-radius: 50px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: all 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform: rotate(-45deg);
}
.toggle__handler .crater {
  position: absolute;
  background-color: #e8cda5;
  opacity: 0;
  transition: opacity 200ms ease-in-out;
  border-radius: 100%;
}
.toggle__handler .crater--1 {
  top: 18px;
  left: 10px;
  width: 4px;
  height: 4px;
}
.toggle__handler .crater--2 {
  top: 28px;
  left: 22px;
  width: 6px;
  height: 6px;
}
.toggle__handler .crater--3 {
  top: 10px;
  left: 25px;
  width: 8px;
  height: 8px;
}

.star {
  position: absolute;
  background-color: #ffffff;
  transition: all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
  border-radius: 50%;
}

.star--1 {
  top: 10px;
  left: 35px;
  z-index: 0;
  width: 30px;
  height: 3px;
}

.star--2 {
  top: 18px;
  left: 28px;
  z-index: 1;
  width: 30px;
  height: 3px;
}

.star--3 {
  top: 27px;
  left: 40px;
  z-index: 0;
  width: 30px;
  height: 3px;
}

.star--4,
.star--5,
.star--6 {
  opacity: 0;
  transition: all 300ms 0 cubic-bezier(0.445, 0.05, 0.55, 0.95);
}

.star--4 {
  top: 16px;
  left: 11px;
  z-index: 0;
  width: 2px;
  height: 2px;
  transform: translate3d(3px, 0, 0);
}

.star--5 {
  top: 32px;
  left: 17px;
  z-index: 0;
  width: 3px;
  height: 3px;
  transform: translate3d(3px, 0, 0);
}

.star--6 {
  top: 36px;
  left: 28px;
  z-index: 0;
  width: 2px;
  height: 2px;
  transform: translate3d(3px, 0, 0);
}

input:checked + .toggle {
  background-color: #749dd6;
}
input:checked + .toggle:before {
  color: #749ed7;
}
input:checked + .toggle:after {
  color: #ffffff;
}
input:checked + .toggle .toggle__handler {
  background-color: #ffe5b5;
  transform: translate3d(40px, 0, 0) rotate(0);
}
input:checked + .toggle .toggle__handler .crater {
  opacity: 1;
}
input:checked + .toggle .star--1 {
  width: 2px;
  height: 2px;
}
input:checked + .toggle .star--2 {
  width: 4px;
  height: 4px;
  transform: translate3d(-5px, 0, 0);
}
input:checked + .toggle .star--3 {
  width: 2px;
  height: 2px;
  transform: translate3d(-7px, 0, 0);
}
input:checked + .toggle .star--4,
input:checked + .toggle .star--5,
input:checked + .toggle .star--6 {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
input:checked + .toggle .star--4 {
  transition: all 300ms 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
}
input:checked + .toggle .star--5 {
  transition: all 300ms 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
}
input:checked + .toggle .star--6 {
  transition: all 300ms 400ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
}
</style>
