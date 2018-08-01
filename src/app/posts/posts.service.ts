import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { Post } from "./post.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: Post[] }>(
        "http://localhost:3000/api/posts"
      )
      .subscribe(postData => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { postId: null, title: title, content: content };
    this.http
      .post<{ message: string }>("http://localhost:3000/api/posts", post)
      .subscribe(responseData => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/postList']);
      });
  }

  deletePost(id: number) {
    
    this.http.delete('http://localhost:3000/api/posts/delete/'+ id)
    .subscribe((data) => {
      
      console.log(data);
      const updatedPosts = this.posts.filter(posts => posts.postId !== id);
      this.posts = updatedPosts;
      
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(['/postList']);
    })
  }
}
