import {ElementRef, Injectable, ViewChild} from '@angular/core';
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  @ViewChild('map') mapElement: ElementRef | undefined;
  map: any;
  constructor() { }

  showMap(city: string, state: string, mapElement: any ) {
    if (!this.mapElement){
      this.mapElement = mapElement
    }
    const geocoder = new google.maps.Geocoder();
    const address = `${city}, ${state}, Brazil`;
    geocoder.geocode({ 'address': address }, (results: { geometry: { location: any; }; }[], status: string) => {
      if (status == 'OK') {
        this.map = new google.maps.Map(this.mapElement?.nativeElement, {
          center: results[0].geometry.location,
          zoom: 10
        });
        new google.maps.Marker({
          map: this.map,
          position: results[0].geometry.location
        });
      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}
