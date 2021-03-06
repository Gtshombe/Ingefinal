import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { ModalController,NavController} from '@ionic/angular';
import { UserService } from '../../../services/user.service';
import { RealestateService } from '../../../services/realestate.service';
import { IonicComponentService } from '../../../services/ionic-component.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-real-agent-detail',
  templateUrl: './real-agent-detail.page.html',
  styleUrls: ['./real-agent-detail.page.scss'],
})
export class RealAgentDetailPage implements OnInit {


  parentPath:any;


  //**** toolbar for hide and show ****/
  showToolbar = false;
  showTitle = false;
  transition:boolean = false;
    

  ingeId: string;
  inge: Observable<any>;

  buyItems:Observable<any>;
  rentItems:Observable<any>;

  constructor(
      public realestateService: RealestateService,
      public userService: UserService,
      private activatedRoute: ActivatedRoute,
      private navController: NavController,
      public router: Router,
      private ionicComponentService : IonicComponentService,
      private modalController: ModalController
  ) 
  { 
    this.ingeId = this.activatedRoute.snapshot.paramMap.get('ingeId');
    
    console.log("itemId="+ this.ingeId);
  
  }
      

 async ngOnInit() {
    this.inge =  await this.realestateService.getAgentDetail( this.ingeId);
    this.buyItems =  await this.realestateService.getAgentDetail( this.ingeId);
  }
  ngOnDestroy() {
	//	this.itemSubscribe.unsubscribe()
  }

  onScroll($event: CustomEvent) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.transition = true;
      this.showToolbar = scrollTop >= 300;
      //console.log("showToolbar="+this.showToolbar);
      this.showTitle = scrollTop >= 300;
      //console.log("showTitle="+this.showTitle);
    }else{
      this.transition = false;
    }
  }


}
