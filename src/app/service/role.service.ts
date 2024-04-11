import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Role } from '../model/Role';
import { IdName } from '../model/IdName';


const BASE_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient) { }
  getAllApis() {
    let url = BASE_URL + "/role/allApis"
    return this.httpClient.get<string[]>(url)
  }
  getAllRoles() {
    let url = BASE_URL + "/role/allRoles"
    return this.httpClient.get<Role[]>(url)
  }

  assignAction(roleId: number, actionName: string) {
    let url = BASE_URL + "/role/assignAction"
    return this.httpClient.post(url, { roleId, actionName })
  }

  detachActionFromRole(roleId: number, actionId: number) {
    let url = BASE_URL + `/role/detachAction?roleId=${roleId}&actionId=${actionId}`
    return this.httpClient.delete(url)
  }

}
