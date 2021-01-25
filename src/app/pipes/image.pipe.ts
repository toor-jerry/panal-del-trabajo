import { Pipe, PipeTransform } from '@angular/core';
import { API_URL } from './../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, token: string, type: string = 'photography', noImage: string = 'no-img.jpg'): string {


    if (!img) {
      return noImage;
    }

    if ( img.indexOf('https') > 0 ) {
      return img;
    }
    let url = `${API_URL}/file`;

    switch (type) {
      case 'photography':
        url += `/${type}/${img}`;
        break;
      case 'photographyChat':
        url += `/${type}/${img}`;
        break;
      case 'messages':
        url += `/${type}/${img}`;
        break;
      case 'credential':
        url += `/${type}/${img}`;
        break;
      case 'cv':
        url += `/${type}/${img}`;
        break;
      default:
        return noImage;

    }
    if (token) {
      url += '?Authorization=' + token;
    }
    return url;

  }

}
