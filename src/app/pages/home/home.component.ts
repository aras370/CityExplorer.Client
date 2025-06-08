import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router"

interface Attraction {
  id: number
  name: string
  city: string
  country: string
  rating: number
  visitors: string
  image: string
  category: string
  description: string
  bestTime: string
}

interface Category {
  name: string
  count: string
  active: boolean
}

interface Stat {
  number: string
  label: string
  icon: string
}

@Component({
  selector: "app-city-explorer",
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  isVisible = false
  isMenuOpen = false
  searchQuery = ""

  popularAttractions: Attraction[] = [
    {
      id: 1,
      name: "برج ایفل",
      city: "پاریس",
      country: "فرانسه",
      rating: 4.8,
      visitors: "۷ میلیون",
      image: "/images/efel.jpg",
      category: "نماد تاریخی",
      description: "نماد عشق و زیبایی در قلب پاریس",
      bestTime: "بهار و تابستان",
    },
    {
      id: 2,
      name: "کولوسئوم",
      city: "رم",
      country: "ایتالیا",
      rating: 4.9,
      visitors: "۶ میلیون",
      image: "/images/RomColoso.jpg",
      category: "میراث جهانی",
      description: "آمفی‌تئاتر باستانی رومیان",
      bestTime: "پاییز و بهار",
    },
   
    {
      id: 4,
      name: "ماچو پیچو",
      city: "کوسکو",
      country: "پرو",
      rating: 4.9,
      visitors: "۱.۵ میلیون",
      image: "/images/machopicho.jpg",
      category: "شهر گمشده",
      description: "شهر مقدس اینکاها در ارتفاعات آند",
      bestTime: "می تا سپتامبر",
    }
  ]

  categories: Category[] = [
    { name: "همه", count: "۲۰۰+", active: true },
    { name: "میراث جهانی", count: "۵۰+", active: false },
    { name: "نمادهای تاریخی", count: "۳۰+", active: false },
    { name: "طبیعت", count: "۸۰+", active: false },
    { name: "مدرن", count: "۴۰+", active: false },
  ]

  stats: Stat[] = [
    { number: "۲۰۰+", label: "جاذبه گردشگری", icon: "fas fa-map-marker-alt" },
    { number: "۱۰۰+", label: "شهر جهان", icon: "fas fa-globe" },
    { number: "۵۰+", label: "کشور", icon: "fas fa-compass" },
    { number: "۱M+", label: "کاربر فعال", icon: "fas fa-users" },
  ]

  ngOnInit(): void {
    setTimeout(() => {
      this.isVisible = true
    }, 100)
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen
  }

  selectCategory(selectedCategory: Category): void {
    this.categories.forEach((category) => {
      category.active = category === selectedCategory
    })
  }

  onSearch(): void {
    console.log("جستجو برای:", this.searchQuery)
    // پیاده‌سازی منطق جستجو
  }

  likeAttraction(attraction: Attraction): void {
    console.log("لایک شد:", attraction.name)
    // پیاده‌سازی منطق لایک
  }

  shareAttraction(attraction: Attraction): void {
    console.log("اشتراک‌گذاری:", attraction.name)
    // پیاده‌سازی منطق اشتراک‌گذاری
  }


}
