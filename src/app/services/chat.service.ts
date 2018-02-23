import { ChatMessage } from './../models/chat-message';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';


@Injectable()
export class ChatService {
  user: firebase.User;
  chatMessages: Observable<ChatMessage[]>;
  chatMessage: ChatMessage;
  userName: Observable<string>;
  notificationkey:string;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
    ) {
        this.afAuth.authState.subscribe(auth => {
          if (auth !== undefined && auth !== null) {
            this.user = auth;
          }
        });
    }

  getUserMessages(userIdd:string) {
    const userId = this.user.uid;
    const path = `/messages/${this.afAuth.auth.currentUser.uid}/${userIdd}`;
    return this.db.list(path).valueChanges;
  }

  getChatUsers() {
    const path = `/Chat/${this.afAuth.auth.currentUser.uid}`;
    return this.db.list(path);
  }

  sendMessage(msg: string) {
    console.log('sending message'+msg);
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    this.db.list('messages').push({
      message: msg,
      sendDate: timestamp,
      email: email,
      timestamp:timestamp,
      type:'text',
      seen:false,
      from:this.afAuth.auth.currentUser.uid,

    }).then(resolve=>{
console.log('added new Message');
const path:firebase.database.Reference=this.db.database.ref(`MessageNotifications/${this.afAuth.auth.currentUser.uid}/${this.afAuth.auth.currentUser.uid}`);
 this.notificationkey=path.push().key;

 const data={
   from:this.afAuth.auth.currentUser.uid,
   message:msg,
 }

 const ref2:firebase.database.Reference=this.db.database.ref(`MessageNotifications/${this.afAuth.auth.currentUser.uid}/${this.notificationkey}`)
ref2.set(data);
});
    
  }

  getMessages()  {
    //query to create our message feed binding
    console.log(this.afAuth.auth.currentUser.uid);
   return this.db.list(`messages/${this.afAuth.auth.currentUser.uid}/${this.afAuth.auth.currentUser.uid}`).valueChanges;
  }
  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                 (now.getUTCMonth() + 1) + '/' +
                 now.getUTCDate();
    const time = now.getUTCHours() + ':' +
                 now.getUTCMinutes() + ':' +
                 now.getUTCSeconds();

    return (date + ' ' + time);
  }
}
