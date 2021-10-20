import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../apiservices.service";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
	constructor(private api: ApiService, private router: Router) {}

	products: any;

	ngOnInit(): void {
		this.api.newProducts().subscribe((res) => {
			this.products = res;
		});
	}
}
