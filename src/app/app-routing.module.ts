import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./Authentication/login/login.component";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { SignupComponent } from "./Authentication/signup/signup.component";
import { AuthGaurd } from "./Authentication/auth.gaurd";

const routes: Routes = [ 
    {
        path: '', 
        pathMatch: 'full',
        redirectTo: '/login'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signUp',
        component: SignupComponent
    },
    {
       path: 'createPosts',
       component: PostCreateComponent,
       canActivate:[AuthGaurd]
    },
    {
        path: 'postList',
        component: PostListComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers:[AuthGaurd]
})
export class AppRoutingModule {}