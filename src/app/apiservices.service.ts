import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class ApiService {
	constructor(private _http: HttpClient) {}

	readonly apiurl = "http://localhost:3000/api";

	loginUser(data: any): Observable<any> {
		return this._http.post(this.apiurl + "/login", data);
	}

	userSignup(data: any): Observable<any> {
		return this._http.post(this.apiurl + "/signup", data);
	}

	newProducts(): Observable<any> {
		return this._http.get(this.apiurl + "/newproducts");
	}

	getProduct(data: any): Observable<any> {
		return this._http.get(this.apiurl + "/product/" + data);
	}

	addProductToCart(data: any): Observable<any> {
		return this._http.post(this.apiurl + "/addToCart", data);
	}

	removeProductFromCart(data: any): Observable<any> {
		return this._http.post(this.apiurl + "/removeFromCart", data);
	}

	removeProductCart(data: any): Observable<any> {
		return this._http.post(this.apiurl + "/removeProductCart", data);
	}

	cartItems(data: any): Observable<any> {
		return this._http.post(this.apiurl + "/cart", data);
	}
}
