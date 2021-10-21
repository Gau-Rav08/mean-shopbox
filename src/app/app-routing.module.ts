import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartComponent } from "./cart/cart.component";
import { FilterComponent } from "./filter/filter.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { ProfileComponent } from "./profile/profile.component";
import { SignupComponent } from "./signup/signup.component";
import { WishlistComponent } from "./wishlist/wishlist.component";

const routes: Routes = [
	{ path: "", component: HomeComponent },
	{ path: "login", component: LoginComponent },
	{ path: "signup", component: SignupComponent },
	{ path: "wishlist", component: WishlistComponent },
	{ path: "cart", component: CartComponent },
	{ path: "filter/:brand", component: FilterComponent },
	{ path: "product/:Id", component: ProductDetailsComponent },
	{ path: "profile", component: ProfileComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
