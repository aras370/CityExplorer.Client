import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


interface Review {
  name: string;
  rating: number;
  date: string;
  comment: string;
}

interface NearbyPlace {
  name: string;
  distance: string;
  rating: string;
  image: string;
}

@Component({
  selector: 'app-place-detail',
  imports: [CommonModule],
  templateUrl: './place-detail.component.html',
  styleUrl: './place-detail.component.css'
})



export class PlaceDetailComponent {


 place = {
    name: 'برج ایفل',
    location: 'پاریس، فرانسه',
    rating: 4.8,
    reviewCount: 12345,
    category: 'جاذبه تاریخی',
    heroImage: '/images/efel.jpeg',
  };

  quickInfo = {
    hours: '۹:۳۰ - ۲۳:۴۵',
    price: '۲۹.۴ یورو (بزرگسالان)',
    bestTime: 'اردیبهشت تا شهریور',
    duration: '۲-۳ ساعت',
    phone: '+33 8 92 70 12 39',
    website: 'toureiffel.paris'
  };

  galleryImages = [
    '/assets/images/eiffel-1.jpg',
    '/assets/images/eiffel-2.jpg',
    '/assets/images/eiffel-3.jpg',
    '/assets/images/eiffel-4.jpg',
    '/assets/images/eiffel-5.jpg',
    '/assets/images/eiffel-6.jpg'
  ];

  reviews: Review[] = [
    {
      name: 'علی احمدی',
      rating: 5,
      date: '۲ روز پیش',
      comment: 'تجربه‌ای فوق‌العاده! منظره از بالای برج واقعاً خیره‌کننده است. حتماً در زمان غروب بروید.'
    },
    {
      name: 'فاطمه رضایی',
      rating: 5,
      date: '۱ هفته پیش',
      comment: 'یکی از بهترین جاذبه‌های پاریس. پیشنهاد می‌کنم بلیت را از قبل رزرو کنید تا در صف نمانید.'
    },
    {
      name: 'محمد کریمی',
      rating: 4,
      date: '۲ هفته پیش',
      comment: 'برج زیبایی است اما خیلی شلوغ بود. بهتر است در ساعات اولیه صبح بروید.'
    }
  ];

  nearbyPlaces: NearbyPlace[] = [
    {
      name: 'موزه لوور',
      distance: '۲.۵ کیلومتر',
      rating: '4.7',
      image: '/assets/images/louvre.jpg'
    },
    {
      name: 'کلیسای نوتردام',
      distance: '۳.۱ کیلومتر',
      rating: '4.6',
      image: 'images/noterdam.jpeg'
    },
    {
      name: 'قوس پیروزی',
      distance: '۲.۸ کیلومتر',
      rating: '4.5',
      image: '/assets/images/arc-triomphe.jpg'
    },
    {
      name: 'خیابان شانزلیزه',
      distance: '۲.۲ کیلومتر',
      rating: '4.4',
      image: '/assets/images/champs-elysees.jpg'
    }
  ];

  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < rating);
  }

  onBookTour(): void {
    // Implement booking logic
    console.log('رزرو تور');
  }

  onGetConsultation(): void {
    // Implement consultation logic
    console.log('مشاوره رایگان');
  }

  onSharePlace(): void {
    // Implement sharing logic
    console.log('اشتراک‌گذاری مکان');
  }

  onSavePlace(): void {
    // Implement save to favorites logic
    console.log('ذخیره مکان');
  }

  onViewAllReviews(): void {
    // Navigate to all reviews page
    console.log('مشاهده همه نظرات');
  }

  onViewAllNearbyPlaces(): void {
    // Navigate to nearby places page
    console.log('مشاهده همه مکان‌های نزدیک');
  }

  onImageClick(index: number): void {
    // Open image in lightbox/modal
    console.log('نمایش تصویر', index);
  }



}
