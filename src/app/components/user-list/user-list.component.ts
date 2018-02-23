import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {Chat} from './../../models/Chat'
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  user: Observable<firebase.User>;
  userEmail: string;
  userId:string;
  chats:Chat[];

   constructor(private db: AngularFireDatabase,private auth:AuthService,private router:Router) {
    this.user = this.auth.authUser();
    this.user.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
        this.userId=user.uid;

        const path=`Chat/${this.userId}`;
        db.list<Chat>(path).valueChanges().subscribe(chats=>{
          this.chats=chats;
        });
      }else{
        console.log('user not logged in');
        this.router.navigate(['login']);
      }
    });
   
   }

  ngOnInit() {
    
  }

 

}
