import { Component, OnInit } from "@angular/core";
import { ApiService } from "../apiservices.service";

@Component({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
	user = {
		userId: "",
		name: "",
		email: "",
		phone: "",
		password: "",
		address: "",
	};

	edit = false;
	constructor(private api: ApiService) {}

	ngOnInit(): void {
		this.user.userId = sessionStorage.getItem("id") || "";
		this.api.getUser(this.user).subscribe((res) => {
			this.user.name = res.name;
			this.user.email = res.email;
			this.user.phone = res.phone;
			this.user.password = res.password;
			this.user.address = res.address;
		});
	}

	onEdit() {
		this.edit = true;
	}
	onSave() {
		this.api.saveUser(this.user).subscribe();
		this.edit = false;
		sessionStorage.setItem("name", this.user.name);
		sessionStorage.setItem("email", this.user.email);
		sessionStorage.setItem("pass", this.user.password);
	}
}
