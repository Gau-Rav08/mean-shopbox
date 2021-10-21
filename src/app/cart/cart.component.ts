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
		if (sessionStorage.getItem("id")) {
			this.forCartData.userId = sessionStorage.getItem("id") || "";
			this.api.cartItems(this.forCartData).subscribe((res) => {
				this.products = res.items;
				this.total = res.tot;
			});
		} else {
			alert("You need to be logged in.");
			this.router.navigate(["/"]);
		}
	}

	reloadCurrentRoute() {
		let currentUrl = this.router.url;
		this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
			this.router.navigate([currentUrl]);
		});
	}

	addItem(id: string) {
		this.forCartData.productId = id;
		this.api.addProductToCart(this.forCartData).subscribe();
		this.reloadCurrentRoute();
	}

	removeItem(id: string) {
		this.forCartData.productId = id;
		this.api.removeProductFromCart(this.forCartData).subscribe();
		this.reloadCurrentRoute();
	}

	removeProd(id: string) {
		this.forCartData.productId = id;
		this.api.removeProductCart(this.forCartData).subscribe();
		this.reloadCurrentRoute();
	}
}
