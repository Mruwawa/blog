import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './models/Post';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Post[] = [];

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
    this.http.get("http://localhost:3000/posts").subscribe((data) => {
      for (let key in data) {
        this.posts.push({
          title: data[key].title,
          description: data[key].description,
          date: data[key].date,
          id: data[key]._id
        });
      }
    });
  }

  deletePost(id: string) {
    this.http.delete(`http://localhost:3000/posts/${id}`).subscribe((data) => {
      
      const deletedPost = this.posts.find(x => x.id == id);

      this.posts = this.posts.filter(x => x.id != id);

      
      let snackBarRef = this._snackBar.open("Deleted a post", "Undo", {
        duration: 2000,
      });;
      snackBarRef.onAction().subscribe(() => {
        this.submitPost({
          title : deletedPost.title,
          description : deletedPost.description,
        });
      });

      // return data;
    });
  }

  submitPost(content) {
    this.http.post<any>("http://localhost:3000/posts", content).subscribe((data) => {
      this.posts.push({
        title: data.title,
        description: data.description,
        date: data.date,
        id: data._id
      });
      let snackBarRef = this._snackBar.open("Created a new post!", "Ok", {
        duration: 2000,
      });;
    });;
  }

  editPost(id : string, content)
  {
   this.http.patch(`http://localhost:3000/posts/${id}`, content).subscribe((data)=>{
     this.posts.find(x => x.id == id).title = content.title;
     this.posts.find(x => x.id == id).description = content.description;
   }); 
  }

}
