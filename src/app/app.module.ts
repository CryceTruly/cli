import { LogginGuardGuard } from './loggin-guard.guard';
import { LoginComponent } from './components/login/login.component';
import { MessageComponent } from './components/message/message.component';
import { FeedComponent } from './components/feed/feed.component';
import { ChatService } from './services/chat.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { MaterialDesignIconModule } from 'material-icon';
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule, AngularFireStorage } from 'angularfire2/storage';
 
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import  {Router,Routes} from '@angular/router';
import { AuthService } from './services/auth.service';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { ChatFormComponent } from './components/chat-form/chat-form.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { LoggedinGuardGuard } from './loggedin-guard.guard';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
    { path: 'chat', component: ChatRoomComponent,canActivate:[LogginGuardGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full',canActivate:[LoggedinGuardGuard]},
  

];

const appRoutingProvider:any[]=[
LogginGuardGuard,LoggedinGuardGuard
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
   ChatRoomComponent,
    ChatFormComponent,
    FeedComponent,
    MessageComponent,
    UserListComponent,
    LoginComponent
    
  ],
  imports: [
   
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'councillor'),
    AngularFirestoreModule.enablePersistence(),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
   AngularFireDatabaseModule,
    RouterModule.forRoot(appRoutes),

    MaterialDesignIconModule
  ],
  providers: [AuthService, ChatService,LogginGuardGuard,LoggedinGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
