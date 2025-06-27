import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { PlaceService } from '../../services/place.service';
import { ToastrService } from 'ngx-toastr';
import { PlaceCategoryDTO } from '../../interfaces/placecategorydto';
import { CategoryService } from '../../services/category.service';


@Component({
  selector: 'app-addnewplacebyadmin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './addnewplacebyadmin.component.html',
})
export class AddnewplacebyadminComponent implements OnInit {

  constructor(private placeservice: PlaceService, private toaster: ToastrService, private placecategory: CategoryService) {
  }

  @Output() creationplace = new EventEmitter();

  form: FormGroup

  placecategories: PlaceCategoryDTO[]

  ngOnInit(): void {
    this.placecategory.GetAllCategories().subscribe(res => {
      this.placecategories = res.data;
    })


    this.form = new FormGroup<{
      name: FormControl<string>;
      city: FormControl<string>;
      country: FormControl<string>;
      categoryId: FormControl<number>;
      age: FormControl<string>;
      description: FormControl<string>;
      visitingHours: FormControl<string>;
      thicketPrice: FormControl<string>;
      bestTimeForVisit: FormControl<string>;
      webSite: FormControl<string>;
      image: FormControl<File | null>;
    }>({
      name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(25)] }),
      city: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(25)] }),
      country: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(25)] }),
      categoryId: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.maxLength(25)] }),
      age: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      description: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(500)] }),
      visitingHours: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      thicketPrice: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      bestTimeForVisit: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      webSite: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      image: new FormControl<File | null>(null, { validators: [Validators.required] })
    });


  }

  showModal = false;


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

    this.placeservice.AddPlaceByAdmin(formData).subscribe({
      next: (res) => {
        if (res.issuccess) {
          this.creationplace.emit();
          console.log('✅ emit fired');
          this.showModal = false;

          this.toaster.success(res.message, 'موفق');
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


  openmodal() {
    this.showModal = true;
  }


  closemodal() {
    this.showModal = false;
    this.form.reset();
    this.previewUrl = null;
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