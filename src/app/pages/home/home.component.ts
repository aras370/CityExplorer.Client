import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router"
import { PlaceDTO } from "../../interfaces/placedto"
import { PlaceService } from "../../services/place.service"
import { map, Observable } from "rxjs"
import { environment } from "../../../environments/environment"
import { Router } from "@angular/router"

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
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  isVisible = false
  isMenuOpen = false
  searchQuery = ""

  constructor(private placeservice: PlaceService, private router: Router) {


  }

  places$: Observable<PlaceDTO[]>

  ngOnInit(): void {
    this.placeservice.GetMostPopularPlace();
    this.places$ = this.placeservice.places$;
    console.log(this.places$);
    setTimeout(() => {
      this.isVisible = true
    }, 100);
  }

  baseimageurl = environment.imageBaseUrl;

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



  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen
  }

  selectCategory(selectedCategory: Category): void {
    this.categories.forEach((category) => {
      category.active = category === selectedCategory
    })
  }





  GoToPlaceDetail(id: number) {
    this.router.navigate(['/placeDetail', id])
  }

}
