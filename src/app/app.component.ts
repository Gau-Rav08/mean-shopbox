import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "./apiservices.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"],
})
export class AppComponent {
	constructor(public api: ApiService, private router: Router) {
		this.api.getProfile();
	}

	needToLogin() {
		alert("You need to be Logged in.");
	}

	goHome() {
		this.router.navigate(["/"]);
	}

	logout() {
		this.api.user = {
			userId: "",
			userExists: false,
			userName: "",
		};
		sessionStorage.clear();
		this.router.navigate(["/"]);
	}
}
