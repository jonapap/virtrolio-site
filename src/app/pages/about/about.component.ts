import { Component, OnInit } from '@angular/core';
import { AboutPagePictures } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: [ './about.component.css' ]
})

/**
 * About component, with a short blurb at the top and a row for each contributor.
 */
export class AboutComponent implements OnInit {
  Arvind: AboutPagePictures;
  Dabeer: AboutPagePictures;
  Eric: AboutPagePictures;
  Janakitti: AboutPagePictures;
  John: AboutPagePictures;
  Tommy: AboutPagePictures;

  /**
   * Image links taken from Google Photos -> @link {https://www.labnol.org/embed/google/photos/} embed code generator
   * -> bit.ly link shortener
   */
  constructor() {
    this.Arvind = new AboutPagePictures('Arvind', 'https://bit.ly/3de5LUs', 'https://bit.ly/2V596Pn');
    this.Dabeer = new AboutPagePictures('Dabeer', 'https://bit.ly/2zPaOwQ', 'https://bit.ly/2YVsSOn');
    this.Eric = new AboutPagePictures('Eric', 'https://bit.ly/2NemLiC', 'https://bit.ly/3dk383t');
    this.Janakitti = new AboutPagePictures('Janakitti', 'https://bit.ly/3elvYBR', 'https://bit.ly/3hOLPuD');
    this.John = new AboutPagePictures('John', 'https://bit.ly/3emaogl', 'https://bit.ly/2AUtyvt');
    this.Tommy = new AboutPagePictures('Tommy', 'https://bit.ly/3hQOJzo', 'https://bit.ly/3emQ1jf');
  }

  ngOnInit(): void { }

}
