import { Component, OnInit } from "@angular/core";
import { ApiService } from "../apiservices.service";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
	constructor(private api: ApiService) {}

	products: any;

	ngOnInit(): void {
		this.api.newProducts().subscribe((res) => {
			this.products = res;
		});
	}
}
