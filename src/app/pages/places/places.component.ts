import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PlaceService } from '../../services/place.service';
import { PlacesListForUsersDTO } from '../../interfaces/placeslistforusersdto';
import { environment } from '../../../environments/environment';
import { CategoryService } from '../../services/category.service';
import { PlaceCategoryDTO } from '../../interfaces/placecategorydto';



@Component({
  selector: 'app-root',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class PlacesComponent implements OnInit {
  searchQuery = '';
  selectedCategory = 'all';
  viewMode: 'grid' | 'list' = 'grid';


  constructor(private placeservice: PlaceService, private category: CategoryService) { }

  // Static places data
  places: PlacesListForUsersDTO[]
  baseimageurl = environment.imageBaseUrl;

  categories: PlaceCategoryDTO[]

  filteredPlaces: PlacesListForUsersDTO[] = [];
  paginatedPlaces: PlacesListForUsersDTO[] = [];

  ngOnInit(): void {

    this.placeservice.GetPlacesListForUsers().subscribe(res => {
      this.places = res.data;
      console.log(this.places);
      this.filteredPlaces = [...this.places];
      this.updatePagination();
    })
    this.category.GetAllCategories().subscribe(res => {
      this.categories = res.data;
    })
  }

  // Filter places based on search and category
  filterPlaces(): void {
    this.filteredPlaces = this.places.filter(place => {
      const matchesSearch = place.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        place.city.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = this.selectedCategory === 'all' || place.placeCategory === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Reset to first page when filtering
    this.currentPage = 1;
    this.updatePagination();
  }

  // Clear all filters
  clearFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = 'all';
    this.filterPlaces();
  }

  // Get category label in Persian
  getCategoryLabel(category: string): string {
    const labels: { [key: string]: string } = {
      'historical': 'تاریخی',
      'religious': 'مذهبی',
      'natural': 'طبیعی',
      'recreational': 'تفریحی',
      'cultural': 'فرهنگی'
    };
    return labels[category] || category;
  }

  // Track by function for performance
  trackByPlaceId(index: number, place: PlacesListForUsersDTO) {
    return place.name;
  }



  // Pagination properties
  currentPage = 1;
  itemsPerPage = 6;
  totalPages = 1;

  // Pagination methods
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredPlaces.length / this.itemsPerPage);

    // Ensure current page is valid
    if (this.currentPage < 1) this.currentPage = 1;
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
    if (this.totalPages === 0) this.currentPage = 1;

    // Get current page items
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedPlaces = this.filteredPlaces.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  // Generate array of page numbers for pagination
  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (this.totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of visible pages
      let start = Math.max(2, this.currentPage - 1);
      let end = Math.min(this.totalPages - 1, this.currentPage + 1);

      // Adjust if at the beginning
      if (this.currentPage <= 2) {
        end = 4;
      }

      // Adjust if at the end
      if (this.currentPage >= this.totalPages - 1) {
        start = this.totalPages - 3;
      }

      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push(-1); // -1 represents ellipsis
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis before last page if needed
      if (end < this.totalPages - 1) {
        pages.push(-2); // -2 represents ellipsis
      }

      // Always show last page
      pages.push(this.totalPages);
    }

    return pages;
  }
}