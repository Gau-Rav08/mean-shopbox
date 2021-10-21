import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../apiservices.service";

@Component({
	selector: "app-wishlist",
	templateUrl: "./wishlist.component.html",
	styleUrls: ["./wishlist.component.css"],
})
export class WishlistComponent implements OnInit {
	products: any;
	forWishData = {
		userId: "",
		productId: "",
	};

	constructor(private api: ApiService, private router: Router) {}

	ngOnInit(): void {
		if (sessionStorage.getItem("id")) {
			this.forWishData.userId = this.api.user.userId;
			this.api.wishItems(this.forWishData).subscribe((res) => {
				this.products = res;
			});
		} else {
			alert("You need to be logged in.");
			this.router.navigate(["/"]);
		}
	}

	removeProd(id: string) {
		this.forWishData.productId = id;
		this.api.removeProductWish(this.forWishData);
		this.router.navigate(["/wishlist"]);
	}
}
