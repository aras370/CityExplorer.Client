import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule,  FormBuilder, type FormGroup, Validators } from "@angular/forms"

interface Country {
  code: string
  name: string
  cities: string[]
}

interface Category {
  id: string
  name: string
  icon: string
}

@Component({
  selector: "app-add-attraction",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./addplacebyuser.component.html",
  styleUrls: ["./addplacebyuser.component.css"],
})
export class AddPlaceByUserComponent implements OnInit {
  attractionForm: FormGroup
  selectedImage: File | null = null
  imagePreview: string | null = null
  isSubmitting = false
  submitSuccess = false

  countries: Country[] = [
    {
      code: "IR",
      name: "ایران",
      cities: ["تهران", "اصفهان", "شیراز", "مشهد", "تبریز", "کرمان", "یزد", "قم", "اهواز", "کرج"],
    },
    {
      code: "FR",
      name: "فرانسه",
      cities: ["پاریس", "لیون", "مارسی", "تولوز", "نیس", "نانت", "استراسبورگ", "مونپلیه", "بوردو", "لیل"],
    },
    {
      code: "IT",
      name: "ایتالیا",
      cities: ["رم", "میلان", "ناپل", "تورین", "پالرمو", "جنوا", "بولونیا", "فلورانس", "باری", "کاتانیا"],
    },
    {
      code: "ES",
      name: "اسپانیا",
      cities: [
        "مادرید",
        "بارسلونا",
        "والنسیا",
        "سویا",
        "ساراگوسا",
        "مالاگا",
        "مورسیا",
        "پالما",
        "لاس پالماس",
        "بیلبائو",
      ],
    },
    {
      code: "GR",
      name: "یونان",
      cities: ["آتن", "تسالونیکی", "پاتراس", "هراکلیون", "لاریسا", "والوس", "یوآنینا", "کاوالا", "سرس", "خانیا"],
    },
    {
      code: "TR",
      name: "ترکیه",
      cities: ["استانبول", "آنکارا", "ازمیر", "بورسا", "آدانا", "غازی عنتاب", "قونیه", "آنتالیا", "دیاربکر", "مرسین"],
    },
    {
      code: "EG",
      name: "مصر",
      cities: [
        "قاهره",
        "اسکندریه",
        "جیزه",
        "شبرا الخیمه",
        "پورت سعید",
        "سوئز",
        "الاقصر",
        "المنصوره",
        "المحله الکبری",
        "طنطا",
      ],
    },
    {
      code: "IN",
      name: "هند",
      cities: ["دهلی نو", "ممبئی", "بنگلور", "حیدرآباد", "احمدآباد", "چنای", "کلکته", "سورات", "پونه", "جیپور"],
    },
    {
      code: "JP",
      name: "ژاپن",
      cities: ["توکیو", "یوکوهاما", "اوساکا", "ناگویا", "ساپورو", "کوبه", "کیوتو", "فوکوکا", "کاواساکی", "سایتاما"],
    },
    {
      code: "CN",
      name: "چین",
      cities: ["پکن", "شانگهای", "گوانگژو", "شنژن", "تیانجین", "ووهان", "دونگگوان", "چنگدو", "فوشان", "نانجینگ"],
    },
  ]

  categories: Category[] = [
    { id: "historical", name: "تاریخی", icon: "fas fa-landmark" },
    { id: "natural", name: "طبیعی", icon: "fas fa-mountain" },
    { id: "religious", name: "مذهبی", icon: "fas fa-mosque" },
    { id: "cultural", name: "فرهنگی", icon: "fas fa-theater-masks" },
    { id: "entertainment", name: "تفریحی", icon: "fas fa-ferris-wheel" },
    { id: "museum", name: "موزه", icon: "fas fa-university" },
    { id: "park", name: "پارک", icon: "fas fa-tree" },
    { id: "beach", name: "ساحلی", icon: "fas fa-umbrella-beach" },
    { id: "shopping", name: "خرید", icon: "fas fa-shopping-bag" },
    { id: "architecture", name: "معماری", icon: "fas fa-building" },
    { id: "sports", name: "ورزشی", icon: "fas fa-running" },
    { id: "food", name: "غذا و نوشیدنی", icon: "fas fa-utensils" },
  ]

  selectedCountry: Country | null = null
  availableCities: string[] = []

  constructor(private formBuilder: FormBuilder) {
    this.attractionForm = this.formBuilder.group({
      country: ["", Validators.required],
      city: ["", Validators.required],
      category: ["", Validators.required],
      placeName: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(10)]],
      image: [""],
    })
  }

  ngOnInit(): void {
    // Subscribe to country changes to update cities
    this.attractionForm.get("country")?.valueChanges.subscribe((countryCode) => {
      this.onCountryChange(countryCode)
    })
  }

  onCountryChange(countryCode: string): void {
    this.selectedCountry = this.countries.find((country) => country.code === countryCode) || null
    this.availableCities = this.selectedCountry ? this.selectedCountry.cities : []

    // Reset city selection when country changes
    this.attractionForm.patchValue({ city: "" })
  }

  onImageSelected(event: Event): void {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (file) {
      this.selectedImage = file

      // Create image preview
      const reader = new FileReader()
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  removeImage(): void {
    this.selectedImage = null
    this.imagePreview = null
    this.attractionForm.patchValue({ image: "" })
  }

  onSubmit(): void {
    if (this.attractionForm.valid) {
      this.isSubmitting = true

      // Simulate API call
      setTimeout(() => {
        console.log("Form Data:", this.attractionForm.value)
        console.log("Selected Image:", this.selectedImage)

        this.isSubmitting = false
        this.submitSuccess = true

        // Reset form after successful submission
        setTimeout(() => {
          this.resetForm()
        }, 2000)
      }, 2000)
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.attractionForm.controls).forEach((key) => {
        this.attractionForm.get(key)?.markAsTouched()
      })
    }
  }

  resetForm(): void {
    this.attractionForm.reset()
    this.selectedImage = null
    this.imagePreview = null
    this.submitSuccess = false
    this.selectedCountry = null
    this.availableCities = []
  }

  // Helper methods for validation
  isFieldInvalid(fieldName: string): boolean {
    const field = this.attractionForm.get(fieldName)
    return !!(field && field.invalid && (field.dirty || field.touched))
  }

  getFieldError(fieldName: string): string {
    const field = this.attractionForm.get(fieldName)
    if (field?.errors) {
      if (field.errors["required"]) {
        return "این فیلد الزامی است"
      }
      if (field.errors["minlength"]) {
        const requiredLength = field.errors["minlength"].requiredLength
        return `حداقل ${requiredLength} کاراکتر وارد کنید`
      }
    }
    return ""
  }
}
