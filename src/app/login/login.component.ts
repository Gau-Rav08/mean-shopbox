import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../apiservices.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
	constructor(private api: ApiService, private router: Router) {}

	ngOnInit(): void {}

	onLogin(user: any) {
		this.api.loginUser(user).subscribe((res) => {
			if (res.success) {
				this.router.navigate([""]);
			} else {
				alert(res.message);
			}
		});
	}
}
