import { Component, OnInit } from "@angular/core";
import { ApiService } from "../apiservices.service";
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: "app-product-details",
	templateUrl: "./product-details.component.html",
	styleUrls: ["./product-details.component.css"],
})
export class ProductDetailsComponent implements OnInit {
	product: any;
	Id: any;
	forCartData = {
		userId: "",
		productId: "",
	};

	constructor(private api: ApiService, private actRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this.actRoute.paramMap.subscribe((params) => {
			this.Id = params.get("Id");
		});
		this.api.getProduct(this.Id).subscribe((res) => {
			this.product = res;
		});
	}

	addToCart() {
		if (sessionStorage.getItem("id") != null) {
			this.forCartData.userId = sessionStorage.getItem("id") || "";
			this.forCartData.productId = this.Id;
			this.api.addProductToCart(this.forCartData);
		} else {
			alert("You need to be logged in.");
		}
	}
}
