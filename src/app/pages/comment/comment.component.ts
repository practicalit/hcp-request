import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  /**
   * object_id is any id that this component will be used as comment box
   * 
   * eg. look at how it is used in request-detail.
   */
  @Input() object_id: number;
  message: string;

  constructor() { }

  ngOnInit(): void {
    console.log(this.object_id)
  }

  public handleSubmit() {
    this.message = "Submitting in progress";
  }

}
