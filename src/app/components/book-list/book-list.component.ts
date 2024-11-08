import { Component, OnInit } from '@angular/core';
import { CurdService } from 'src/app/service/curd.service';



@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  Books: any = [];

  constructor(private curdService: CurdService) { }

  ngOnInit(): void {
    this.curdService.GetBooks().subscribe((res => {
      console.log(res)
      this.Books = res;
    }))
  }

  deleteBook(id: any, i: any) {
    if (window.confirm('Do you want to delete?')) {
      this.curdService.DeleteBook(id).subscribe((res) => {
        this.Books.splice(i, 1);
      })
    }
  }
}
