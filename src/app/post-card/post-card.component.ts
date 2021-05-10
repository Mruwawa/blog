import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { title } from 'process';
import { Post } from '../models/Post';
import { PostService } from '../post.service';


export interface DialogData {
  title: string;
}

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})

export class PostCardComponent implements OnInit {

  @Input() post: Post;

  dateString : string;

  editMode: boolean = false;

  titleEditInput: string;
  descEditInput: string;

  constructor(public dialog: MatDialog, private postServ: PostService) {

  }

  ngOnInit(): void {
    this.titleEditInput = this.post.title;
    this.descEditInput = this.post.description;

    const date : Date = new Date(this.post.date);

    this.dateString = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;
    // console.log(this.post.date.getDate());

    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialog, {
      // width: '250px',
      data: { title: this.post.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.postServ.deletePost(this.post.id);
      }
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  submitChanges(){
    this.postServ.editPost(this.post.id, {title: this.titleEditInput, description: this.descEditInput});
    this.toggleEditMode();
  }

}

@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
  styleUrls: ['delete-dialog.component.css']
})
export class DeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}