import { Component ,OnInit, NgZone} from '@angular/core';
import { Router } from '@angular/router';
import { CurdService } from 'src/app/service/curd.service';
import { FormGroup , FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {

  bookForm!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private curdService: CurdService
  ) {
    this.bookForm= this.formBuilder.group({
      name: [''],
      price: [''],
      description: ['']
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): any {
    this.curdService.Addbook(this.bookForm.value)
      .subscribe(() => {
          console.log('Data added successfully!')
          this.ngZone.run(() => this.router.navigateByUrl('/books-list'))
        }, (err) => {
          console.log(err);
      });
  }

}
