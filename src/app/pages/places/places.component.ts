import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Place Interface
export interface Place {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  location: string;
  country: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule]
})
export class PlacesComponent {
  searchQuery = '';
  selectedCategory = 'all';
  viewMode: 'grid' | 'list' = 'grid';
  
  // Pagination properties
  currentPage = 1;
  itemsPerPage = 6;
  totalPages = 1;
  
  // Static places data
  places: Place[] = [
    {
      id: 1,
      name: 'برج ایفل',
      description: 'برج ایفل یک برج آهنی ۳۳۰ متری است که در سال ۱۸۸۹ در پاریس، فرانسه ساخته شد. این برج به عنوان نماد فرانسه و یکی از شناخته‌شده‌ترین سازه‌های جهان شناخته می‌شود.',
      imageUrl: '/images/efel.jpg',
      category: 'cultural',
      location: 'پاریس',
      country: 'فرانسه'
    },
    {
      id: 2,
      name: 'تاج محل',
      description: 'تاج محل یک آرامگاه مرمری سفید در آگرا، هند است که توسط امپراتور مغول شاه جهان در سال ۱۶۳۲ به یاد همسر محبوبش ممتاز محل ساخته شد. این بنا یکی از شاهکارهای معماری مغول است.',
      imageUrl: '/images/TaajMahal.jpg',
      category: 'historical',
      location: 'آگرا',
      country: 'هند'
    },
    {
      id: 3,
      name: 'مسجد الاقصی',
      description: 'مسجد الاقصی یکی از مقدس‌ترین مکان‌های اسلامی است که در شهر قدیمی بیت‌المقدس قرار دارد. این مسجد سومین مکان مقدس در اسلام پس از مسجدالحرام و مسجدالنبی است.',
      imageUrl: '/images/masjed.jpg',
      category: 'religious',
      location: 'بیت‌المقدس',
      country: 'فلسطین'
    },
    {
      id: 4,
      name: 'آبشار نیاگارا',
      description: 'آبشار نیاگارا مجموعه‌ای از سه آبشار است که در مرز بین ایالات متحده و کانادا قرار دارد. این آبشارها به دلیل حجم زیاد آب و زیبایی خیره‌کننده، یکی از جاذبه‌های گردشگری محبوب جهان هستند.',
      imageUrl: '/images/niiagara.jpg',
      category: 'natural',
      location: 'مرز آمریکا و کانادا',
      country: 'آمریکا/کانادا'
    },
    {
      id: 5,
      name: 'دیزنی‌لند توکیو',
      description: 'دیزنی‌لند توکیو اولین پارک دیزنی خارج از ایالات متحده است که در سال ۱۹۸۳ افتتاح شد. این پارک تفریحی با الهام از داستان‌های والت دیزنی، سالانه میلیون‌ها بازدیدکننده را به خود جذب می‌کند.',
      imageUrl: '/images/diseny.jpg',
      category: 'recreational',
      location: 'توکیو',
      country: 'ژاپن'
    },
    {
      id: 6,
      name: 'کلیسای جامع نوتردام',
      description: 'کلیسای جامع نوتردام یکی از بزرگترین و مشهورترین کلیساهای کاتولیک در جهان است که در پاریس، فرانسه قرار دارد. این کلیسا نمونه‌ای عالی از معماری گوتیک فرانسوی است.',
      imageUrl: '/images/noterdam.jpg',
      category: 'religious',
      location: 'پاریس',
      country: 'فرانسه'
    },
    {
      id: 7,
      name: 'اهرام جیزه',
      description: 'اهرام جیزه مجموعه‌ای از سه هرم بزرگ در مصر هستند که به عنوان مقبره فراعنه ساخته شده‌اند. هرم بزرگ جیزه تنها بازمانده از عجایب هفتگانه جهان باستان است.',
      imageUrl: '/images/Heram.jpg',
      category: 'historical',
      location: 'قاهره',
      country: 'مصر'
    },
    {
      id: 8,
      name: 'پارک ملی یلوستون',
      description: 'پارک ملی یلوستون اولین پارک ملی در جهان است که در سال ۱۸۷۲ تاسیس شد. این پارک به خاطر چشمه‌های آب گرم، آبفشان‌ها، دره‌های عمیق و حیات وحش متنوع خود مشهور است.',
      imageUrl: '/images/yelostone/jpg',
      category: 'natural',
      location: 'وایومینگ',
      country: 'آمریکا'
    },
    {
      id: 9,
      name: 'موزه لوور',
      description: 'موزه لوور یکی از بزرگترین و پربازدیدترین موزه‌های جهان است که در پاریس، فرانسه قرار دارد. این موزه خانه بیش از ۳۸۰,۰۰۰ اثر هنری از جمله تابلوی مونالیزا اثر لئوناردو داوینچی است.',
      imageUrl: '/images/luvr.jpg',
      category: 'cultural',
      location: 'پاریس',
      country: 'فرانسه'
    },
    {
      id: 10,
      name: 'دیوار بزرگ چین',
      description: 'دیوار بزرگ چین یک سازه دفاعی باستانی است که برای محافظت از امپراتوری چین در برابر حملات اقوام شمالی ساخته شده است. این دیوار با طول بیش از ۲۱,۰۰۰ کیلومتر، بزرگترین سازه ساخته شده توسط انسان است.',
      imageUrl: '/images/wall.jpg',
      category: 'historical',
      location: 'پکن',
      country: 'چین'
    },
    {
      id: 11,
      name: 'مکه مکرمه',
      description: 'مکه مکرمه مقدس‌ترین شهر در اسلام است که در عربستان سعودی قرار دارد. کعبه، قبله مسلمانان، در مرکز مسجدالحرام در این شهر واقع شده است و سالانه میلیون‌ها مسلمان برای انجام مناسک حج به این شهر سفر می‌کنند.',
      imageUrl: '/images/makkeh.jpg',
      category: 'religious',
      location: 'مکه',
      country: 'عربستان سعودی'
    },
    {
      id: 12,
      name: 'جزایر مالدیو',
      description: 'جزایر مالدیو مجموعه‌ای از جزایر استوایی در اقیانوس هند هستند که به خاطر سواحل شنی سفید، آب‌های فیروزه‌ای و صخره‌های مرجانی رنگارنگ مشهور هستند. این جزایر یکی از محبوب‌ترین مقاصد گردشگری لوکس در جهان هستند.',
      imageUrl: '/images/maldive.jpg',
      category: 'recreational',
      location: 'اقیانوس هند',
      country: 'مالدیو'
    }
  ];

  filteredPlaces: Place[] = [];
  paginatedPlaces: Place[] = [];

  constructor() {
    this.filteredPlaces = [...this.places];
    this.updatePagination();
  }

  // Filter places based on search and category
  filterPlaces(): void {
    this.filteredPlaces = this.places.filter(place => {
      const matchesSearch = place.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           place.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           place.location.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = this.selectedCategory === 'all' || place.category === this.selectedCategory;
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
  trackByPlaceId(index: number, place: Place): number {
    return place.id;
  }
  
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