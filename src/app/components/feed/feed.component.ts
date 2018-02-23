import { ChatService } from './../../services/chat.service';
import { Component, OnInit ,OnChanges} from '@angular/core'
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
feed:any;
  constructor(private authService:AuthService ,private chatService:ChatService) { }

  ngOnInit() {
    this.feed=this.chatService.getUserMessages(this.authService.currentUserId);

  }
ngOnChanges(){
  this.feed=this.chatService.getUserMessages(this.authService.currentUserId);
}
}
