import { Consellor } from './../models/Consellor';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from 'angularfire2/firestore';
import { User } from './../models/User';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private authState: any;
  uid;
  Consellor: Observable<Consellor[]>;
  consellorDoc: AngularFirestoreDocument<Consellor>;

  consellorsCollection: AngularFirestoreCollection<Consellor>;
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private router: Router) {
    this.consellorsCollection = db.collection<Consellor>('counsellors');
      this.user = afAuth.authState;

      console.log(this.afAuth.auth.currentUser);
    }

    authUser() {
      return this.user;
    }

    get currentUserId(): string {
    this.user = this.authUser();
    this.user.subscribe(user => {
        if (user) {
        
          this.uid= user.uid;
          
        }
      });

      return this.uid;
    }

    login(email: string, password: string) {
      console.log('called login');
      return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
          this.authState = user;
          console.log(user);
          //this.setUserStatus('online');
          this.router.navigate(['chat']);
        });
    }

    logout() {
      console.log('loging out user');
      this.afAuth.auth.signOut();
      this.router.navigate(['login']);
    }

    
     requestPasswordReset(email:string){
    this.afAuth.auth.sendPasswordResetEmail(email).then((e)=>{
    Materialize.toast('Reset email sent to '+email,2000);
    }).catch(err=>{
      Materialize.toast('An error occured: '+err,2000 );
    });
    }
}
