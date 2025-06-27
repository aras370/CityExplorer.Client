import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { PlaceDetailDTO } from "../../interfaces/placedetaildto"
import { PlaceService } from "../../services/place.service"
import { environment } from "../../../environments/environment"
import { ActivatedRoute } from "@angular/router"
import { ToastrService } from "ngx-toastr"
import { Router } from "@angular/router"



interface Review {
  name: string
  date: string
  isLiked: boolean
  isDisliked: boolean
  likeCount: number
  dislikeCount: number
  comment: string
}



@Component({
  selector: "app-place-details",
  templateUrl: "./place-detail.component.html",
  imports: [CommonModule],
  styleUrls: ["./place-detail.component.css"],
})
export class PlaceDetailComponent implements OnInit {
 



  reviews: Review[] = [
    {
      name: "علی احمدی",
      date: "۲ روز پیش",
      isLiked: false,
      isDisliked: false,
      likeCount: 15,
      dislikeCount: 2,
      comment: "تجربه فوق‌العاده‌ای بود! منظره از بالای برج واقعاً خیره‌کننده است.",
    },
    {
      name: "مریم رضایی",
      date: "۱ هفته پیش",
      isLiked: false,
      isDisliked: false,
      likeCount: 8,
      dislikeCount: 1,
      comment: "جای دیدنی عالی، اما در ساعات شلوغ بهتر است از قبل بلیط تهیه کنید.",
    },
    {
      name: "حسن محمدی",
      date: "۲ هفته پیش",
      isLiked: false,
      isDisliked: false,
      likeCount: 22,
      dislikeCount: 0,
      comment: "یکی از بهترین تجربه‌های سفرم به پاریس. حتماً در شب هم ببینید.",
    },
  ]

 

  baseimageurl = environment.imageBaseUrl;

  placedetail: PlaceDetailDTO | null

  placeid: number;

  constructor(private placeservice: PlaceService, private route: ActivatedRoute, private toaster: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.placeid = Number(this.route.snapshot.paramMap.get('id'));
    this.placeservice.GetPlaceById(this.placeid).subscribe({
      next: res => {
       
        this.placedetail = res.data;
        console.log(this.placedetail)
      },
      error: err => {
        console.error('خطای API:', err);
        this.toaster.error('مکان پیدا نشد یا خطای ارتباط با سرور', 'خطا');
        this.router.navigate(['/']);
      }


    })

  }



  onImageClick(index: number): void {
    console.log("Image clicked:", index)
  }

  onViewAllReviews(): void {
    console.log("View all reviews clicked")
  }

  onViewAllNearbyPlaces(): void {
    console.log("View all nearby places clicked")
  }

  onLike(item: any): void {
    if (item.isLiked) {
      // اگر قبلاً لایک شده، لایک را برداریم
      item.isLiked = false
      item.likeCount--
    } else {
      // لایک کنیم
      item.isLiked = true
      item.likeCount++

      // اگر دیسلایک شده بود، آن را برداریم
      if (item.isDisliked) {
        item.isDisliked = false
        item.dislikeCount--
      }
    }
    console.log("Like action:", item)
  }

  onDislike(item: any): void {
    if (item.isDisliked) {
      // اگر قبلاً دیسلایک شده، دیسلایک را برداریم
      item.isDisliked = false
      item.dislikeCount--
    } else {
      // دیسلایک کنیم
      item.isDisliked = true
      item.dislikeCount++

      // اگر لایک شده بود، آن را برداریم
      if (item.isLiked) {
        item.isLiked = false
        item.likeCount--
      }
    }
    console.log("Dislike action:", item)
  }
}
