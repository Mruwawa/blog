import { Component, OnInit } from '@angular/core';
import { Post } from '../models/Post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private postServ : PostService) { }

  ngOnInit(): void {
  }

  getPosts()
  {
    return this.postServ.posts;    
  }

}
