import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlaceDTO } from '../interfaces/placedto';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ApiRespons } from '../apiresponse/apiresponse';
import { PlaceCategoryDTO } from '../interfaces/placecategorydto';
import { environment } from '../../environments/environment';
import { PlacesListForUsersDTO } from '../interfaces/placeslistforusersdto';
import { PlaceDetailDTO } from '../interfaces/placedetaildto';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private httpclient: HttpClient) {

  }


  private placesSubject = new BehaviorSubject<PlaceDTO[]>([]);

  places$ = this.placesSubject.asObservable();

  private adminplaces = new BehaviorSubject<PlaceDTO[]>([]);

  adminplaces$ = this.adminplaces.asObservable();

  GetMostPopularPlace() {
    return this.httpclient.get<ApiRespons<PlaceDTO[]>>(environment.apiBaseUrl + 'Places/GetMostPopularPlaces').subscribe(result => {
      this.placesSubject.next(result.data)
      console.log(result);
    })
  }

  GetPlaceById(id: number) {
    return this.httpclient.get<ApiRespons<PlaceDetailDTO>>(environment.apiBaseUrl + 'Places/GetPlaceById/' + id);
  }

  GetPlacesListForUsers() {

    return this.httpclient.get<ApiRespons<PlacesListForUsersDTO[]>>(environment.apiBaseUrl + 'Places/GetPlacesForUsers');

  }


  GetAllPlaceCategory() {

    return this.httpclient.get<ApiRespons<PlaceCategoryDTO[]>>(environment.apiBaseUrl + "PlaceCategory/GetAllPlaceCetegory")


  }

  GetPlacesForAdminPanel(): Observable<PlaceDTO[]> {
    return this.httpclient.get<ApiRespons<PlaceDTO[]>>(
      environment.apiBaseUrl + 'admin/Places/GetAllPlaces'
    ).pipe(
      map(result => {
        this.adminplaces.next(result.data);
        return result.data;
      })
    );
  }


  DeletePlace(id: number) {

    return this.httpclient.delete<ApiRespons<null>>(environment.apiBaseUrl + 'admin/Places/DeletePlace/' + id);

  }

  DetermineStatuse(id: number, status: string) {
    return this.httpclient.put<ApiRespons<null>>(environment.apiBaseUrl + 'admin/Places/DetermineStatuse/' + id + '/' + status, null);
  }

  AddPlaceByAdmin(place: FormData) {
    return this.httpclient.post<ApiRespons<null>>(environment.apiBaseUrl + 'admin/Places/AddNewPlace', place);
  }

  CreatePlaceByUser(formdata: FormData) {

    return this.httpclient.post<ApiRespons<null>>(environment.apiBaseUrl + 'Places/CreatePlaceByUser', formdata);

  }

}


