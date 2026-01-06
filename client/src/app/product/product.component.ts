import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  productForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.productForm.valid) {
      this.http.post(environment.apiUrl, this.productForm.value).subscribe({
        next: (res) => {
          console.log('Product Created Successfully:', res);
          this.successMessage = 'Product Created Successfully!';
          this.productForm.reset();
        },
        error: (err) => {
          console.error('Product Creation error:', err);
          this.errorMessage = 'Product Creation Failed!';
        }
      });
    }
  }
}
