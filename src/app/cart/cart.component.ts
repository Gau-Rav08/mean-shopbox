import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../apiservices.service";

@Component({
	selector: "app-cart",
	templateUrl: "./cart.component.html",
	styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
	products: any;
	total: number = 0;
	forCartData = {
		userId: "",
		productId: "",
	};

	constructor(private api: ApiService, private router: Router) {}

	ngOnInit(): void {
		if (true) {
			//sessionStorage.getItem("id") != null
			// this.id = sessionStorage.getItem("id") || "";
			this.forCartData.userId = "616fb92c9f2229cdddbf50ad";
			this.api.cartItems(this.forCartData).subscribe((res) => {
				this.products = res.items;
				this.total = res.tot;
			});
		} else {
			alert("You need to be logged in.");
		}
	}

	addItem(id: string) {
		this.forCartData.productId = id;
		this.api.addProductToCart(this.forCartData);
		this.router.navigate(["/cart"]);
	}

	removeItem(id: string) {
		this.forCartData.productId = id;
		this.api.removeProductFromCart(this.forCartData);
		this.router.navigate(["/cart"]);
	}

	removeProd(id: string) {
		this.forCartData.productId = id;
		this.api.removeProductCart(this.forCartData);
		this.router.navigate(["/cart"]);
	}
}
