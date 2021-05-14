import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const mainUrl = 'http://localhost:8080/api/dsforms';

@Injectable({
    providedIn: 'root'
})
export class DSFormService {

    constructor(
        private http: HttpClient
    ) { }

    getAll() {
        return this.http.get(mainUrl);
    }

    get(id) {
        return this.http.get(`${mainUrl}/${id}`);
    }

    create(data) {
        return this.http.post(`${mainUrl}`, data);
    }

    update(id, data) {
        return this.http.put(`${mainUrl}/${id}`, data);
    }

    delete(_id) {
        return this.http.delete(`${mainUrl}/${_id}`);
    }

    deleteAll() {
        return this.http.delete(mainUrl);
    }

    findbyEmail(email) {
        return this.http.get(`${mainUrl}?email=${email}`);
    }

}