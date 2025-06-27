import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiRespons } from '../apiresponse/apiresponse';
import { PlaceCategoryDTO } from '../interfaces/placecategorydto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpclient:HttpClient) { }


GetAllCategories(){

return this.httpclient.get<ApiRespons<PlaceCategoryDTO[]>>(environment.apiBaseUrl+'PlaceCategory/GetAllPlaceCetegory');

}





}
