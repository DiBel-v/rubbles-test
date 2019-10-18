import { PhotosService } from './../photos.service';
import { Component, OnInit, ElementRef, OnChanges, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  public counter: number;
  public bordRad = 10;
  public sizeSquare = 120;
  public transPx: number;
  public for: string;
  public data: any;
  constructor(private service: PhotosService, private elem: ElementRef, private router: Router, private activeRoute: ActivatedRoute) { }

  public ngOnInit(): void {
    this.service.getPhotos().subscribe((response) => {
      console.log(response);
      this.data = response;
    });
    this.activeRoute.queryParams.subscribe(params => {
      if (this.counter) {
        this.counter = +params.count;
      } else { this.counter = 3; }
      if (this.counter > 2) {
        this.transPx = this.sizeSquare * (this.counter / 3);
        this.for = `translate(${this.transPx}px)`;
      } else {
        this.transPx = 0;
        this.for = `translate(${0}px)`;
      }
      this.router.navigate([], { queryParams: { count: this.counter }, relativeTo: this.activeRoute });
    });
  }

  public previousSquare(): void {
    if (this.transPx + 50 < this.sizeSquare * (this.counter - this.counter / 2)) {
      if (this.transPx + this.sizeSquare <= this.sizeSquare * (this.counter - this.counter / 2)) {
        this.transPx += this.sizeSquare + 5;
        const elements = this.elem.nativeElement.querySelectorAll('.square');
        elements.forEach(element => {
          element.style.transitionDuration = '1.2s';
          element.style.transform = ('translate(' + this.transPx + 'px)');
        });
      }
    }
  }
  public nextSquare(): void {
    if (this.transPx > -this.sizeSquare * 2) {
      console.log(this.transPx);
      if (this.transPx - this.sizeSquare > -this.sizeSquare * (this.counter - this.counter / 2)) {
        this.transPx -= this.sizeSquare + 5;
        const elements = this.elem.nativeElement.querySelectorAll('.square');
        elements.forEach(element => {
          element.style.transitionDuration = '1.2s';
          console.log(element.style.transform);
          element.style.transform = ('translate(' + this.transPx + 'px)');
        });
      }
    }
  }

  sizeSquareChanged(sizeSquare) {
    const elements = this.elem.nativeElement.querySelectorAll('.square');
    elements.forEach((element) => {
      element.style.flex = `1 0 ${sizeSquare}px`;
      element.style.height = `${sizeSquare}px`;
    });
  }

  bordRadChanged(bordRad) {
    console.log(bordRad);
    const elements = this.elem.nativeElement.querySelectorAll('.square');
    elements.forEach((element) => {
      element.style.borderRadius = `${bordRad}px`;
    });
  }

  addSquare(): void {
    ++this.counter;
  }
}
