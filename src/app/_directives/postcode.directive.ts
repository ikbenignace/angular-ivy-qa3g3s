import { Directive, HostListener, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { Location } from '../../models/location/location';
import { NgModel } from '@angular/forms';


@Directive({
  selector: '[appPostcode]'
})
export class PostcodeDirective {

  @Output() location = new EventEmitter<string>();
  @Output() country = new EventEmitter<string>();
  @Output() province = new EventEmitter<string>();
  @Output() onFound = new EventEmitter<Location>();

  @Input() elementToFocus: any;

  constructor(
    private el: ElementRef,
    private locationService: LocationService,
  ) { }

  @HostListener('blur') onBlur() {
    this.locationService.getlocationByPostcode(this.el.nativeElement.value).subscribe(data => {
      console.log(data);
      this.location.emit(data.Gemeente);
      this.country.emit(data.Country.Name);
      this.province.emit(data.Province.Name);
      this.onFound.emit(data);
      console.log(this.elementToFocus)
      this.elementToFocus.focus();
    })

  }

}
