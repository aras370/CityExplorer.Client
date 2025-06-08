import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"


interface Place {
  name: string
  location: string
  heroImage: string
  rating: number
  reviewCount: number
  category: string
}

interface Review {
  name: string
  date: string
  rating: number
  comment: string
}

interface QuickInfo {
  hours: string
  price: string
  bestTime: string
  duration: string
  phone: string
  website: string
}

interface NearbyPlace {
  name: string
  image: string
  distance: string
  rating: number
}

@Component({
  selector: "app-place-details",
  templateUrl: "./place-detail.component.html",
  imports:[CommonModule],
  styleUrls: ["./place-detail.component.css"],
})
export class PlaceDetailComponent implements OnInit {
  place: Place = {
    name: "برج ایفل",
    location: "پاریس، فرانسه",
    heroImage: "/images/efel.jpg",
    rating: 4.8,
    reviewCount: 15420,
    category: "جاذبه تاریخی",
  }

  galleryImages: string[] = [
    "/placeholder.svg?height=200&width=200",
    "/placeholder.svg?height=200&width=200",
    "/placeholder.svg?height=200&width=200",
    "/placeholder.svg?height=200&width=200",
    "/placeholder.svg?height=200&width=200",
    "/placeholder.svg?height=200&width=200",
  ]

  reviews: Review[] = [
    {
      name: "علی احمدی",
      date: "۲ روز پیش",
      rating: 5,
      comment: "تجربه فوق‌العاده‌ای بود! منظره از بالای برج واقعاً خیره‌کننده است.",
    },
    {
      name: "مریم رضایی",
      date: "۱ هفته پیش",
      rating: 4,
      comment: "جای دیدنی عالی، اما در ساعات شلوغ بهتر است از قبل بلیط تهیه کنید.",
    },
    {
      name: "حسن محمدی",
      date: "۲ هفته پیش",
      rating: 5,
      comment: "یکی از بهترین تجربه‌های سفرم به پاریس. حتماً در شب هم ببینید.",
    },
  ]

  quickInfo: QuickInfo = {
    hours: "۹:۳۰ - ۲۳:۴۵",
    price: "۲۹ یورو",
    bestTime: "بهار و پاییز",
    duration: "۲-۳ ساعت",
    phone: "+33 8 92 70 12 39",
    website: "www.toureiffel.paris",
  }

  nearbyPlaces: NearbyPlace[] = [
    {
      name: "موزه لوور",
      image: "/images/luvr.jpg",
      distance: "۲.۵ کیلومتر",
      rating: 4.7,
    },
    {
      name: "کلیسای نوتردام",
      image: "/images/noterdam.jpg",
      distance: "۳.۱ کیلومتر",
      rating: 4.6,
    },
    {
      name: "قوس پیروزی",
      image: "/images/victory.jpg",
      distance: "۱.۸ کیلومتر",
      rating: 4.5,
    },
  ]

  constructor() {}

  ngOnInit(): void {}

  onImageClick(index: number): void {
    // پیاده‌سازی نمایش تصویر در مودال
    console.log("Image clicked:", index)
  }

  onViewAllReviews(): void {
    // پیاده‌سازی نمایش همه نظرات
    console.log("View all reviews clicked")
  }

  onViewAllNearbyPlaces(): void {
    // پیاده‌سازی نمایش همه مکان‌های نزدیک
    console.log("View all nearby places clicked")
  }

  getStarArray(rating: number): boolean[] {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating)
    }
    return stars
  }
}
