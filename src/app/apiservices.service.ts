import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class ApiService {
	constructor(private _http: HttpClient) {}

	readonly apiurl = "http://localhost:3000/api";

	user = {
		userId: "",
		userName: "",
		userExists: false,
	};

	async getProfile() {
		try {
			if (sessionStorage.getItem("id")) {
				this.user.userId = sessionStorage.getItem("id") || "";
				this.user.userName = sessionStorage.getItem("name") || "";
				this.user.userExists = true;
			}
		} catch (e) {
			console.log(e);
		}
	}

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
		return this._http.post(this.apiurl + "/product", data);
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

	wishItems(data: any): Observable<any> {
		return this._http.post(this.apiurl + "/wishlist", data);
	}

	addProductToWish(data: any): Observable<any> {
		return this._http.post(this.apiurl + "/addToWish", data);
	}

	removeProductWish(data: any): Observable<any> {
		return this._http.post(this.apiurl + "/removeProductWish", data);
	}

	checkInWish(data: any): Observable<any> {
		return this._http.post(this.apiurl + "/checkWish", data);
	}

	getFilterProduct(data: any): Observable<any> {
		return this._http.post(this.apiurl + "/filter", data);
	}
}
