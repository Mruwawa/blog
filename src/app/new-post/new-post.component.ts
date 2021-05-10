import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { title } from 'process';
import { Post } from '../models/Post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  titleInput: string;
  descInput: string;
  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }


  submit() {
    if (this.titleInput && this.descInput) {
      const post: Post =
      {
        title: this.titleInput,
        description: this.descInput
      }
      this.postService.submitPost(post);
      document.querySelector("form").reset();
    }
  }
}
