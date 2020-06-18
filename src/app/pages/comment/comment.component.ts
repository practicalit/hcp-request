import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentRequest } from '../../models/comment.model';
import { RequestService } from '../../services/request.service';
import { ActivatedRoute } from '@angular/router';

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
  commentForm: FormGroup;
  comments: any[];

  constructor(
    private formBuilder: FormBuilder,
    private requestService: RequestService,
    private activatedRoute: ActivatedRoute,
  ) { }
  request_id: number;
  requestedBy: string;
  ngOnInit(): void {
    this.comments = [];
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.request_id = Number(params.get('requestId'));
        if (this.request_id != null && this.request_id) {
          this.requestService.getcomment(this.request_id).subscribe(response => {
            if (response.success) {
              this.comments = response.data;
            }
          }
          )
        }
      }
    );
  
  this.commentForm = this.formBuilder.group({
    comment: ['', Validators.required]
  });
}
onSubmit() {
  if (this.commentForm.invalid) {
    return;
  }

  let request: CommentRequest = {
    request_id: this.object_id,
    comment: this.commentForm.controls.comment.value
  };
  this.requestService.postComment(request).subscribe(
    response => {
      if (response) {
        this.message = "Successfully posted the comment";
      } else {
        this.message = "It didn't go through, please try again";
      }
    }
  );
}
}



