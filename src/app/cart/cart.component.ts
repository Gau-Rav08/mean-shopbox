import { Component, OnInit } from "@angular/core";
import { ApiService } from "../apiservices.service";

@Component({
	selector: "app-cart",
	templateUrl: "./cart.component.html",
	styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
	products: any;
	total: number = 0;
	user = {
		id: "",
	};

	constructor(private api: ApiService) {}

	ngOnInit(): void {
		if (true) {
			//sessionStorage.getItem("id") != null
			// this.id = sessionStorage.getItem("id") || "";
			this.user.id = "616fb92c9f2229cdddbf50ad";
			this.api.cartItems(this.user).subscribe((res) => {
				this.products = res.items;
				this.total = res.tot;
			});
		} else {
			alert("You need to be logged in.");
		}
	}

	addItem(id: string) {}
	removeItem(id: string) {}
}
