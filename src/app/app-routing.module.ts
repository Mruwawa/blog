import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { NewPostComponent } from './new-post/new-post.component';

const routes: Routes = [
  {path: "", component: MainComponent},
  // {path: "MyList", component: MyListComponent}
  {path:"newPost", component:NewPostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
