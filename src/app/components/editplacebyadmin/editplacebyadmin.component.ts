import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-editplacebyadmin",
  imports: [CommonModule],
  templateUrl: "./editplacebyadmin.component.html",
  styleUrl: "./editplacebyadmin.component.css",
})
export class EditplacebyadminComponent {
  @Input() showmodal = false;

  openeditmodal() {
    this.showmodal = true;
  }

  @Output() closemodal = new EventEmitter();

  closeeditmodal() {
    this.showmodal = false;
    this.closemodal.emit();
  }
}
