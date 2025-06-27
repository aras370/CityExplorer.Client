import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms"
import { PlaceService } from "../../services/place.service"
import { ToastrService } from "ngx-toastr"
import { PlaceCategoryDTO } from "../../interfaces/placecategorydto"
import { CategoryService } from "../../services/category.service"



@Component({
  selector: "app-add-attraction",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./addplacebyuser.component.html",
  styleUrls: ["./addplacebyuser.component.css"],
})
export class AddPlaceByUserComponent implements OnInit {



  constructor(private formBuilder: FormBuilder, private placeservice: PlaceService, private toaster: ToastrService,private category: CategoryService) {

  }

  form: FormGroup
  placecategories: PlaceCategoryDTO[]

  ngOnInit(): void {

this.category.GetAllCategories().subscribe(res=>{
  this.placecategories=res.data
})

    this.form = new FormGroup<{
      name: FormControl<string>;
      city: FormControl<string>;
      country: FormControl<string>;
      categoryId: FormControl<number>;
      age: FormControl<string>;
      description: FormControl<string>;
      visitingHours: FormControl<string>;
      image: FormControl<File | null>;
    }>({
      name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(25)] }),
      city: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(25)] }),
      country: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(25)] }),
      categoryId: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.maxLength(25)] }),
      age: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      description: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(500)] }),
      visitingHours: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      image: new FormControl<File | null>(null, { validators: [Validators.required] })
    });

  }



  onsubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const formData = new FormData();

    Object.entries(this.form.value).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    formData.append('placeImage', this.placeimage, this.placeimage.name);

    this.form.reset();
    this.previewUrl = null;

    this.placeservice.CreatePlaceByUser(formData).subscribe({
      next: (res) => {
        if (res.issuccess) {

          this.toaster.success('ممنون از همکاری و سلیقه ای که به خرج دادید', 'موفق');
        }
        else {
          this.toaster.error(res.message, 'خطا')
        }
      },
      error: (err) => {
        console.error(err);
      }
    })

  }


  previewUrl: string | ArrayBuffer | null = null;

  placeimage: File;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.placeimage = file;
      this.previewUrl = URL.createObjectURL(file);
      this.form.get('image')?.setValue(file);
      this.form.get('image')?.markAsTouched();
    }
  }

  removeImage() {
    this.previewUrl = null;
    this.form.get('image')?.setValue(null);
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }


}
