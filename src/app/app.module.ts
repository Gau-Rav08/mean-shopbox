import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { SignupComponent } from "./signup/signup.component";
import { WishlistComponent } from "./wishlist/wishlist.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { ApiService } from "./apiservices.service";

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		HomeComponent,
		SignupComponent,
		WishlistComponent,
		ProductDetailsComponent,
	],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
	providers: [ApiService],
	bootstrap: [AppComponent],
})
export class AppModule {}
