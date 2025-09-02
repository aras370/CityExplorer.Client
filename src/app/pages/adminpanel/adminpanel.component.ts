import { Component, type OnInit, viewChild, ViewChild } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule, FormBuilder, type FormGroup, Validators } from "@angular/forms"
import { PlaceService } from '../../services/place.service';
import { take } from "rxjs"
import { PlaceDTO } from '../../interfaces/placedto';
import { FilterComponent } from "../../components/filter/filter.component";
import { PlacesforadminComponent } from "../../components/placesforadmin/placesforadmin.component";
import { AddnewplacebyadminComponent } from "../../components/addnewplacebyadmin/addnewplacebyadmin.component";
import { Stats } from "../../interfaces/stats";
import { EditplacebyadminComponent } from "../../components/editplacebyadmin/editplacebyadmin.component";





@Component({
  selector: "app-admin-panel",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FilterComponent, PlacesforadminComponent, AddnewplacebyadminComponent, EditplacebyadminComponent],
  templateUrl: "./adminpanel.component.html",
  styleUrls: ["./adminpanel.component.css"],
})
export class AdminPanelComponent implements OnInit {



  filterParams = { name: '', category: '', status: '' };

  onSearchParamsChange(params: { name: string; category: string; status: string }) {
    this.filterParams = params;
  }

  constructor(private formBuilder: FormBuilder, private placeservice: PlaceService) { }

  @ViewChild(AddnewplacebyadminComponent) modal: AddnewplacebyadminComponent;


  showmodal() {
    this.modal.openmodal();
  }


  stats: Stats = {
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0
  };

  ngOnInit(): void {

    this.loadAdminPlaces();

  }




  onPlaceChanged() {
    console.log('💥 Parent caught the event');
    this.loadAdminPlaces();
  }

  private loadAdminPlaces() {
    this.placeservice.GetPlacesForAdminPanel()
      .pipe(take(1))
      .subscribe((places: PlaceDTO[]) => {
        this.stats.total = places.length;
        this.stats.approved = places.filter(p => p.status === 'تاییدشده').length;
        this.stats.pending = places.filter(p => p.status === 'درانتظارتایید').length;
        this.stats.rejected = places.filter(p => p.status === 'ردشده').length;
      });
  }

  showeditmodal = false

  closemodal(){
    this.showeditmodal=false;
  }

  openmodal(value: boolean) {
    this.showeditmodal = value;
  }

}
