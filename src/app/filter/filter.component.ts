import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "../apiservices.service";

@Component({
	selector: "app-filter",
	templateUrl: "./filter.component.html",
	styleUrls: ["./filter.component.css"],
})
export class FilterComponent implements OnInit {
	products: any;
	forWish = {
		userId: "",
		productId: "",
	};
	search = {
		brand: "",
	};
	constructor(
		private api: ApiService,
		private router: Router,
		private actRoute: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.actRoute.paramMap.subscribe((params) => {
			this.search.brand = params.get("brand") || "";
		});
		this.api.getFilterProduct(this.search).subscribe((res) => {
			this.products = res;
		});
	}

	addToWish(id: string) {
		if (sessionStorage.getItem("id") != null) {
			this.forWish.userId = sessionStorage.getItem("id") || "";
			this.forWish.productId = id;
			this.api.addProductToWish(this.forWish).subscribe();
		} else {
			alert("You need to be logged in.");
		}
	}

	filterQ(filter: any) {
		console.log(filter);
		// this.api.getFilterProduct(this.search).subscribe((res) => {
		// 	this.products = res;
		// });
	}
}
