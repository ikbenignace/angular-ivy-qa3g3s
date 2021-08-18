import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTelephoneFormat]'
})
export class TelephoneFormatDirective {



  constructor(private el: ElementRef) { }


  @HostListener('keydown', ['$event']) onKeyDown(e) {
    console.log('key: ' + e.keyCode);
    var chrTyped, chrCode = 0, evt = e ? e : event;
    if (evt.charCode) chrCode = evt.charCode;
    else if (evt.which) chrCode = evt.which;
    else if (evt.keyCode) chrCode = evt.keyCode;

    if (chrCode == 0) chrTyped = 'SPECIAL KEY';
    else chrTyped = String.fromCharCode(chrCode);

    //[test only:] display chrTyped on the status bar 
    self.status = 'inputDigitsOnly: chrTyped = ' + chrTyped;
    console.info("is ctrl")
    console.info(evt.ctrlKey)
    console.info("keycode")
    console.info(chrCode)

    //Digits, special keys & backspace [\b] work as usual:
    if (chrTyped.match(/\d|[\./+() ]|[\b]|SPECIAL/) || evt.key.match(/\d|[\./+() ]|[\b]|SPECIAL/) || evt.key == "Meta" || evt.key == "v" || evt.key == "c" || evt.key == "x") return true;
    if (evt.altKey || evt.ctrlKey || chrCode < 28 || chrCode == 35 || chrCode == 36 || chrCode == 37 || chrCode == 38 || chrCode == 39 || chrCode == 40) return true;

    //Any other input? Prevent the default response:
    if (evt.preventDefault) evt.preventDefault();
    evt.returnValue = false;
    return false;
  }


  @HostListener('blur') onBlur() {
    console.log('blur: ' + this.el.nativeElement.value);
    var value = this.el.nativeElement.value
    var shortZones = ['02', '03', '04', '09']//dit zijn de enige zones met 2 cijfers
    var zoneSerparator = ' ';
    var serparator = ' ';
    var isInternational = false;
    if (value) {
      var intCode = "";
      var orgtext = value;
      if (value.indexOf('+') == 0) {
        intCode = value.substring(0, 3);
        value = "0" + value.substring(3, value.length);
      }
      value = value.replace(/\D/g, ''); // enkel cijfers overhouden

      if (value.indexOf('00') == 0) {
        intCode = value.substring(0, 4);
        value = "0" + value.substring(4, value.length);
      }

      if (value.length == 9) { // vast nummer
        var zone = value.substring(0, 2);
        if (shortZones.indexOf(zone) > -1) {// met 2 cijferige zone
          value = zone + zoneSerparator + value.substring(2, 5) + serparator + value.substring(5, 7) + serparator + value.substring(7, 9);
        } else {// met 3 cijferige zone
          value = value.substring(0, 3) + zoneSerparator + value.substring(3, 5) + serparator + value.substring(5, 7) + serparator + value.substring(7, 9);
        }
      } else {
        if (value.length == 10) {// gsm nummers
          value = value.substring(0, 4) + zoneSerparator + value.substring(4, 6) + serparator + value.substring(6, 8) + serparator + value.substring(8, 10);
        } else {
          value = orgtext;
          intCode = "";
        }
      }
      if (intCode) {
        if (intCode.length == 4)
          intCode = intCode.substring(0, 2) + " " + intCode.substring(2, 4)
        value = intCode + " " + value.substring(1, value.length);
      }
      this.el.nativeElement.value=value
    }

  }


}
