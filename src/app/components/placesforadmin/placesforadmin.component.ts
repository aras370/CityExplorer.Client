import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, map, Observable, take } from 'rxjs';
import { PlaceDTO } from '../../interfaces/placedto';
import { PlaceService } from '../../services/place.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-placesforadmin',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './placesforadmin.component.html',
  styleUrl: './placesforadmin.component.css'
})
export class PlacesforadminComponent implements OnInit {

  @Input() set filterParams(value: { name: string; category: string; status: string }) {
    if (value) {
      this.filter$.next(value);
    }
  }

  places$: Observable<PlaceDTO[]>;

  filteredPlaces$: Observable<PlaceDTO[]>;

  filter$ = new BehaviorSubject<{ name: string; category: string; status: string }>({ name: '', category: '', status: '' });

  baesimageurl = environment.imageBaseUrl;


  constructor(private placeservice: PlaceService, private toaster: ToastrService) { }

  ngOnInit(): void {

    this.places$ = this.placeservice.adminplaces$;

    this.filteredPlaces$ = combineLatest([this.places$, this.filter$]).pipe(
      map(([places, filter]) =>
        places.filter(p =>
          (filter.name ? p.name.includes(filter.name) : true) &&
          (filter.category ? p.placeCategory === filter.category : true) &&
          (filter.status ? p.status === filter.status : true)
        )
      )
    );
    this.paginatedPlaces$ = combineLatest([this.filteredPlaces$, this.filter$]).pipe(
      map(([places]) => {
        this.totalPages = Math.ceil(places.length / this.itemsPerPage);
        const start = (this.currentPage - 1) * this.itemsPerPage;
        return places.slice(start, start + this.itemsPerPage);
      })
    );
  }


  showDeleteModal = false;


  placeId: number | null = null;

  openDeleteModal(id: number): void {
    this.placeId = id;
    this.showDeleteModal = true;
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.placeId = null;
  }

  confirmDelete(): void {
    if (this.placeId !== null) {

      this.placeservice.DeletePlace(this.placeId).subscribe({

        next: (res) => {
          this.placeId = null;

          if (res.issuccess) {
            this.toaster.success(res.message, 'موفقیت')
            this.refreshPlaces();
            this.placeChanged.emit();
            this.showDeleteModal = false;

          }
        },
        error: (err) => {
          console.error(err);

        }
      });
    }
  }


  refreshPlaces(): void {
    this.placeservice.GetPlacesForAdminPanel().pipe(take(1)).subscribe(data => this.places = data);
  }


  @Output() placeChanged = new EventEmitter();

  places: PlaceDTO[] = [];


  determinstatuse(id: number, status: string) {

    this.placeservice.DetermineStatuse(id, status).subscribe({
      next: (res) => {
        if (res.issuccess) {
          this.toaster.success(res.message, 'موفق');
          this.refreshPlaces();
          this.placeChanged.emit();
        }
      },
      error: (err) => {
        console.error(err);

      }
    })

  }

  GoToPlaceDetail(id: number) {

  }


  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      // باید دوباره استریم رو تحریک کنیم
      this.filter$.next(this.filter$.value);
    }
  }

  getPaginationPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  currentPage = 1;
  itemsPerPage = 4;
  totalPages = 1;
  paginatedPlaces$: Observable<PlaceDTO[]>;

}
