import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlaceCategoryDTO } from '../../interfaces/placecategorydto';
import { PlaceService } from '../../services/place.service';



@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit{
  
  
  
  constructor(private placeservice:PlaceService){}
  
  
  Categories:PlaceCategoryDTO[]


  ngOnInit(): void {
    
    this.placeservice.GetAllPlaceCategory().subscribe(res=>{
      this.Categories=res.data
    })

  }



  @Output() searchparams = new EventEmitter<{ name: string; category: string; status: string }>();

  selectedName = '';
  selectedStatus = '';
  selectedCategory = '';

  

  onSearchChange(): void {
    this.searchparams.emit({
      name: this.selectedName,
      category: this.selectedCategory,
      status: this.selectedStatus
    });
  }
}
