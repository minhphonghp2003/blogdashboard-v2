import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { createClient } from '@supabase/supabase-js'
import { environment } from '../../environments/environment';
const supabase = createClient(environment.SUPABASE_URL, environment.SUPABASE_KEY)
function _formatString(str: string) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/\[|\]|\{|\}|\\/g, "");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
}


interface Cookie {
  name: string,
  value: string
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private cookieService: CookieService) {
  }
  addCookie(cookie: Cookie) {
    this.cookieService.set(cookie.name, cookie.value)
  }
  deleteCookie(name: string) {
    this.cookieService.delete(name)
  }
  getCookie(name: string) {
    return this.cookieService.get(name)
  }
  extractImage(path: string): string {
    const { data } = supabase
      .storage
      .from('image')
      .getPublicUrl(path)
    return data.publicUrl
  }
  async uploadImage(path: string, file: any) {

    path = _formatString(path)
    const { data, error } = await supabase
      .storage
      .from('image')
      .upload(path, file, {
        upsert: true
      })
    return data
  }
  async uploadPost(path: string, file: any) {
    path = _formatString(path)
    const { data, error } = await supabase
      .storage
      .from('post')
      .upload(path, file, {
        upsert: true
      })
    return data

  }
  async downloadPost(path: string) {
    const { data, error } = await supabase
      .storage
      .from('post')
      .download(path)
    return await data!.text()
  }
  async deleteDraft(path: string) {
    const { data, error } = await supabase
      .storage
      .from('post')
      .remove([path])
    return data
  }
  saveFile({ content, fileName, contentType }: { content: any, fileName: string, contentType: string }) {
    var a = document.createElement('a');
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

}
