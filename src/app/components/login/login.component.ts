import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User={
    email:'',
    password:''
  }
    constructor(private authServic:AuthService,private router:Router) { 

      this.authServic.authUser().subscribe(user=>{
        if(user){

          this.router.navigate(['/chat']);
        }
      });


    }
  
    ngOnInit() {
  console.log('onit');
      $('.preloader').hide();
      $('.test').hide();
    }
  
  
    checkUserSignIn(){
      if((this.user.email.length)==0){
        Materialize.toast('Email is required',2000);
        return;
            }
      if((this.user.email.length)<7){
  Materialize.toast('Email length not accepted',2000);
  return;
      }
      if((this.user.password.length)==0){
        Materialize.toast('Password is required',2000);
        return;
            }
      if((this.user.password.length)<8){
        Materialize.toast('Password length not accepted,should be atleast 8 characters',2000);
        return;
            }
            $('.preloader').show();
  this.authServic.login(this.user.email,this.user.password).catch(e=>{
    console.log(e);
    $('.preloader').hide();
    Materialize.toast('Cant log in '+e,3000);
  
    return;
  }).then(e=>{
    $('.preloader').hide();
  console.log('hello');
  });
            console.log(1);
    
    }
  
  
    modifyPassword(){
       $('.card1').fadeOut('slow');
      $('.test').fadeIn('fast');
    }
  
  
    hideMe(){
      $('.test').fadeOut('slow');
      $('.card1').fadeIn('fast');
    }
    sendPasswordResetEmail(){
      if((this.user.email.length)==0){
        Materialize.toast('Email is required',2000);
        return;
            }
      if((this.user.email.length)<7){
  Materialize.toast('Email length not accepted',2000);
  return;
      }
  
      console.log(1);
      this.authServic.requestPasswordReset(this.user.email);
     
    }
  }
  