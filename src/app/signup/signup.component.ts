import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../apiservices.service";

@Component({
	selector: "app-signup",
	templateUrl: "./signup.component.html",
	styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
	constructor(private api: ApiService, private router: Router) {}

	ngOnInit(): void {}

	onSignup(user: any) {
		if (user.password == user.confirmPassword) {
			this.api.userSignup(user).subscribe((res) => {
				if (res.success) {
					alert("Account has been created!");
					this.router.navigate(["login"]);
				} else {
					alert(res.message);
				}
			});
		} else {
			alert("Confirm Password should be same as Password");
		}
	}
}
