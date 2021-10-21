import { Component, OnInit } from "@angular/core";
import { ApiService } from "../apiservices.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
	selector: "app-product-details",
	templateUrl: "./product-details.component.html",
	styleUrls: ["./product-details.component.css"],
})
export class ProductDetailsComponent implements OnInit {
	product: any;
	forCartData = {
		userId: "",
		productId: "",
	};
	addedToCart = false;
	addedToWish = false;

	constructor(
		private api: ApiService,
		private actRoute: ActivatedRoute,
		private route: Router
	) {}

	ngOnInit(): void {
		this.actRoute.paramMap.subscribe((params) => {
			this.forCartData.productId = params.get("Id") || "";
		});
		this.api.getProduct(this.forCartData).subscribe((res) => {
			this.product = res;
		});
		if (sessionStorage.getItem("id") != null) {
			this.forCartData.userId = sessionStorage.getItem("id") || "";
			this.api.checkInWish(this.forCartData).subscribe((res) => {
				this.addedToWish = res.check;
			});
		}
	}

	addToCart() {
		if (sessionStorage.getItem("id") != null) {
			this.forCartData.userId = sessionStorage.getItem("id") || "";
			this.api.addProductToCart(this.forCartData).subscribe();
			this.addedToCart = true;
			this.route.navigate(["/cart"]);
		} else {
			alert("You need to be logged in.");
		}
	}

	addToWish() {
		if (sessionStorage.getItem("id") != null) {
			this.forCartData.userId = sessionStorage.getItem("id") || "";
			this.api.addProductToWish(this.forCartData).subscribe();
			this.addedToWish = true;
		} else {
			alert("You need to be logged in.");
		}
	}

	removeFromWish() {
		this.addedToWish = false;
		this.api.removeProductWish(this.forCartData).subscribe();
	}
}
