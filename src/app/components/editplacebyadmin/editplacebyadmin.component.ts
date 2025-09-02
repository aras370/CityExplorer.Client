import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: "app-editplacebyadmin",
  imports: [CommonModule],
  templateUrl: "./editplacebyadmin.component.html",
  styleUrl: "./editplacebyadmin.component.css",
})
export class EditplacebyadminComponent {


 showmodal = false;

openeditmodal(){
  this.showmodal=true
}


closeeditmodal(){
  this.showmodal=false
}


}
