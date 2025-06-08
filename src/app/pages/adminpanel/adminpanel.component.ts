import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule,  FormBuilder, type FormGroup, Validators } from "@angular/forms"

interface Attraction {
  id: string
  name: string
  country: string
  city: string
  category: string
  description: string
  image: string
  status: "pending" | "approved" | "rejected"
  createdAt: Date
  views: number
  likes: number
}

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

interface Stats {
  total: number
  approved: number
  pending: number
  rejected: number
}

@Component({
  selector: "app-admin-panel",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./adminpanel.component.html",
  styleUrls: ["./adminpanel.component.css"],
})
export class AdminPanelComponent implements OnInit {

  Math = Math;

[x: string]: any
  attractions: Attraction[] = []
  filteredAttractions: Attraction[] = []

  // Form and Modal
  attractionForm: FormGroup
  isModalOpen = false
  isEditMode = false
  currentAttractionId: string | null = null
  selectedImage: File | null = null
  imagePreview: string | null = null

  // Filters and Search
  searchQuery = ""
  selectedStatus = ""
  selectedCategory = ""
  selectedCountry = ""

  // Pagination
  currentPage = 1
  itemsPerPage = 10
  totalPages = 0

  // Loading and Messages
  isLoading = false
  showDeleteConfirm = false
  deleteAttractionId: string | null = null
  successMessage = ""
  errorMessage = ""

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

  selectedCountryObj: Country | null = null
  availableCities: string[] = []

  constructor(private formBuilder: FormBuilder) {
    this.attractionForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      country: ["", Validators.required],
      city: ["", Validators.required],
      category: ["", Validators.required],
      description: ["", [Validators.required, Validators.minLength(10)]],
      status: ["pending", Validators.required],
    })
  }

  ngOnInit(): void {
    this.loadAttractions()
    this.setupFormSubscriptions()
  }

  setupFormSubscriptions(): void {
    this.attractionForm.get("country")?.valueChanges.subscribe((countryCode) => {
      this.onCountryChange(countryCode)
    })
  }

  loadAttractions(): void {
    // Simulate API call with sample data
    this.attractions = [
      {
        id: "1",
        name: "هرم جیزه",
        country: "مصر",
        city: "قاهره",
        category: "تاریخی",
        description: "نماد شهر قاهره و یکی از مهم‌ترین جاذبه‌های گردشگری مصر",
        image: "/images/Heram.jpg",
        status: "approved",
        createdAt: new Date("2024-01-15"),
        views: 15420,
        likes: 892,
      },
      {
        id: "2",
        name: "برج ایفل",
        country: "فرانسه",
        city: "پاریس",
        category: "تاریخی",
        description: "نماد شهر پاریس و یکی از معروف‌ترین جاذبه‌های گردشگری جهان",
        image: "/images/efel.jpg",
        status: "approved",
        createdAt: new Date("2024-01-10"),
        views: 25680,
        likes: 1543,
      },
      {
        id: "3",
        name: "کولوسئوم",
        country: "ایتالیا",
        city: "رم",
        category: "تاریخی",
        description: "آمفی‌تئاتر باستانی رومیان و یکی از عجایب هفتگانه جهان",
        image: "/images/RomColoso.jpg",
        status: "pending",
        createdAt: new Date("2024-01-20"),
        views: 8920,
        likes: 456,
      },
      {
        id: "4",
        name: "پارک یلواستون",
        country: "امریکا",
        city: "آتلانتا",
        category: "پارک",
        description: "یکی از زیباترین پارک‌های شهر آتلانتا",
        image: "/images/yelostone.jpg",
        status: "rejected",
        createdAt: new Date("2024-01-25"),
        views: 2340,
        likes: 123,
      },
    ]

    this.applyFilters()
  }

  applyFilters(): void {
    let filtered = [...this.attractions]

    // Search filter
    if (this.searchQuery.trim()) {
      filtered = filtered.filter(
        (attraction) =>
          attraction.name.includes(this.searchQuery) ||
          attraction.city.includes(this.searchQuery) ||
          attraction.country.includes(this.searchQuery),
      )
    }

    // Status filter
    if (this.selectedStatus) {
      filtered = filtered.filter((attraction) => attraction.status === this.selectedStatus)
    }

    // Category filter
    if (this.selectedCategory) {
      filtered = filtered.filter((attraction) => attraction.category === this.selectedCategory)
    }

    // Country filter
    if (this.selectedCountry) {
      filtered = filtered.filter((attraction) => attraction.country === this.selectedCountry)
    }

    this.filteredAttractions = filtered
    this.totalPages = Math.ceil(this.filteredAttractions.length / this.itemsPerPage)
    this.currentPage = 1
  }

  getPaginatedAttractions(): Attraction[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    const endIndex = startIndex + this.itemsPerPage
    return this.filteredAttractions.slice(startIndex, endIndex)
  }

  getStats(): Stats {
    return {
      total: this.attractions.length,
      approved: this.attractions.filter((a) => a.status === "approved").length,
      pending: this.attractions.filter((a) => a.status === "pending").length,
      rejected: this.attractions.filter((a) => a.status === "rejected").length,
    }
  }

  openAddModal(): void {
    this.isEditMode = false
    this.currentAttractionId = null
    this.attractionForm.reset()
    this.attractionForm.patchValue({ status: "pending" })
    this.selectedImage = null
    this.imagePreview = null
    this.isModalOpen = true
  }

  openEditModal(attraction: Attraction): void {
    this.isEditMode = true
    this.currentAttractionId = attraction.id
    this.attractionForm.patchValue({
      name: attraction.name,
      country: this.getCountryCode(attraction.country),
      city: attraction.city,
      category: attraction.category,
      description: attraction.description,
      status: attraction.status,
    })
    this.imagePreview = attraction.image
    this.isModalOpen = true
  }

  closeModal(): void {
    this.isModalOpen = false
    this.isEditMode = false
    this.currentAttractionId = null
    this.attractionForm.reset()
    this.selectedImage = null
    this.imagePreview = null
  }

  onCountryChange(countryCode: string): void {
    this.selectedCountryObj = this.countries.find((country) => country.code === countryCode) || null
    this.availableCities = this.selectedCountryObj ? this.selectedCountryObj.cities : []
    this.attractionForm.patchValue({ city: "" })
  }

  onImageSelected(event: Event): void {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (file) {
      this.selectedImage = file
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
  }

  onSubmit(): void {
    if (this.attractionForm.valid) {
      this.isLoading = true

      setTimeout(() => {
        const formData = this.attractionForm.value
        const countryName = this.getCountryName(formData.country)

        if (this.isEditMode && this.currentAttractionId) {
          // Update existing attraction
          const index = this.attractions.findIndex((a) => a.id === this.currentAttractionId)
          if (index !== -1) {
            this.attractions[index] = {
              ...this.attractions[index],
              name: formData.name,
              country: countryName,
              city: formData.city,
              category: formData.category,
              description: formData.description,
              status: formData.status,
              image: this.imagePreview || this.attractions[index].image,
            }
            this.showSuccessMessage("جاذبه با موفقیت ویرایش شد")
          }
        } else {
          // Add new attraction
          const newAttraction: Attraction = {
            id: Date.now().toString(),
            name: formData.name,
            country: countryName,
            city: formData.city,
            category: formData.category,
            description: formData.description,
            status: formData.status,
            image: this.imagePreview || "/placeholder.svg?height=200&width=300",
            createdAt: new Date(),
            views: 0,
            likes: 0,
          }
          this.attractions.unshift(newAttraction)
          this.showSuccessMessage("جاذبه جدید با موفقیت اضافه شد")
        }

        this.isLoading = false
        this.closeModal()
        this.applyFilters()
      }, 1000)
    }
  }

  confirmDelete(attractionId: string): void {
    this.deleteAttractionId = attractionId
    this.showDeleteConfirm = true
  }

  deleteAttraction(): void {
    if (this.deleteAttractionId) {
      this.attractions = this.attractions.filter((a) => a.id !== this.deleteAttractionId)
      this.showSuccessMessage("جاذبه با موفقیت حذف شد")
      this.applyFilters()
    }
    this.showDeleteConfirm = false
    this.deleteAttractionId = null
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false
    this.deleteAttractionId = null
  }

  updateStatus(attractionId: string, newStatus: "approved" | "rejected"): void {
    const attraction = this.attractions.find((a) => a.id === attractionId)
    if (attraction) {
      attraction.status = newStatus
      this.showSuccessMessage(`وضعیت جاذبه به "${this.getStatusText(newStatus)}" تغییر یافت`)
      this.applyFilters()
    }
  }

  // Helper methods
  getCountryName(countryCode: string): string {
    const country = this.countries.find((c) => c.code === countryCode)
    return country ? country.name : countryCode
  }

  getCountryCode(countryName: string): string {
    const country = this.countries.find((c) => c.name === countryName)
    return country ? country.code : ""
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find((c) => c.id === categoryId)
    return category ? category.name : categoryId
  }

  getCategoryIcon(categoryId: string): string {
    const category = this.categories.find((c) => c.id === categoryId)
    return category ? category.icon : "fas fa-map-marker-alt"
  }

  getStatusText(status: string): string {
    switch (status) {
      case "approved":
        return "تایید شده"
      case "pending":
        return "در انتظار بررسی"
      case "rejected":
        return "رد شده"
      default:
        return status
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  showSuccessMessage(message: string): void {
    this.successMessage = message
    setTimeout(() => {
      this.successMessage = ""
    }, 3000)
  }

  showErrorMessage(message: string): void {
    this.errorMessage = message
    setTimeout(() => {
      this.errorMessage = ""
    }, 3000)
  }

  // Pagination methods
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page
    }
  }

  getPaginationPages(): number[] {
    const pages: number[] = []
    const maxVisible = 5
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2))
    const end = Math.min(this.totalPages, start + maxVisible - 1)

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }

  // Form validation helpers
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
