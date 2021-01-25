import { API_URL } from './../../config/config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  extentionsFileValid = ['pdf', 'doc', 'docx', 'docm', 'odt', 'rtf', 'csv', 'xlsx', 'xlsm', 'odsm', 'pps', 'ppt', 'ppsx', 'pptx', 'ppsm', 'pptm', 'potxm', 'odp'];

  constructor() { }

  getFileExtentions() {
    return this.extentionsFileValid;
  }
  upladFile( file: File, typeFile: string, category: string, user: string = null, typeRequest: string = 'PUT', room: string = null, _idTemp: string = null ): Promise<any> {

    return new Promise( (resolve, reject) => {

      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append( typeFile, file, file.name );

      xhr.onreadystatechange = () => {

        if (xhr.readyState === 4) {
          if (xhr.status === 201) {
            resolve( JSON.parse(xhr.response) );
          } else {
            reject({response: xhr.response});
          }
        }

      };
      let url: string = '';
      const token = localStorage.getItem('token');
      if (user) {
        url += `${API_URL}/upload/${typeFile}/${category}?Authorization=${token}&id=${user}`;
        if (_idTemp) url += `&_idTemp=${_idTemp}`;
        xhr.open('PUT', url, true);
      } else if (room) {
        url += `${API_URL}/upload/${typeFile}/${category}?room=${room}&Authorization=${token}`;
        if (_idTemp) url += `&_idTemp=${_idTemp}`;
        xhr.open('POST', url, true);
      }else {
        url += `${API_URL}/upload/${typeFile}/${category}?Authorization=${token}`;
        if (_idTemp) url += `&_idTemp=${_idTemp}`;
        xhr.open('PUT', url, true);
      }

      xhr.send(formData);

    });
  }
}
