# Unit 3: Create ECommerce Application using Express
Steps to create new ECommerceApp using Express and Angular

**Step1: Create new folder for ECommerceApp**

## Create Server using Express
**Step 2: Create new folder "server" inside ECommerceApp folder**

**Step 3: Initialize new Node.js project inside "server" folder**
```
cd /server
npm init -y
```
**Step 4: Install required dependencies for Express server**
```
npm install express body-parser cors dotenv
npm install nodemon --save-dev
```
**Step 5: Create new file "server.js" inside "server" folder**
**Step 6: Set up basic Express server in "server.js"**
```
const express = require('express');
const app = express();
app.use(app.urlencoded({ extended: true }));
app.use(app.json());

app.use(cors());
app.use(dotenv.config());

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
```
**Step 6: Add script to start server using nodemon in "package.json"**
```
"scripts": {
  "start": "nodemon server.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```
**Step 7: Start the server**
```
npm start
```

## Create Client using Angular 17
**Step 1: Install Angular CLI globally**
```
npm install -g @angular/cli
```
**Step 2: Create new Angular project**
```
ng new client
```
**Step 3: Navigate to client folder**
```
cd client
```
**Step 4: Start the Angular development server**
```
ng serve
```
**Step 5: Open browser and navigate to "http://localhost:4200" to see the Angular application running.**
**Step 6: Remove default Angular code in "src/app/app.component.html"**
```
<!-- src/app/app.component.html -->
<h1>
  Welcome to ECommerceApp!
</h1>
```

**Step 7: Create new component "product"**
```
ng generate component product
```
**Step 8: Add product component to "src/app/app.module.ts"**
```
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductComponent } from "./product/product.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ECommerceApp';
}
```
**Step 9: Add product component to "src/app/app.component.html"**
```
<!-- src/app/app.component.html -->
<h1>
  Welcome to {{ title }}!
</h1>
<app-product></app-product>

<router-outlet />
```
**Step 10: Add product component to "src/app/product/product.component.ts"**
```
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  productForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
    }
  }
}
```

**Step 11: Add product component to "src/app/product/product.component.html"**
```
<!-- src/app/product/product.component.html -->
<form [formGroup]="productForm" (ngSubmit)="onSubmit()">
    <div>
        <label for="name">Name:</label>
        <input id="name" type="text" formControlName="name">
    </div>
    <div>
        <label for="price">Price:</label>
        <input id="price" type="number" formControlName="price">
    </div>
    <div>
        <label for="description">Description:</label>
        <textarea id="description" formControlName="description"></textarea>
    </div>
    <button type="submit" [disabled]="productForm.invalid">Submit</button>
</form>
```

**Step 12: Add product component to "src/app/product/product.component.css"**
```
form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
}

div {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
}

label {
    font-weight: bold;
    margin-bottom: 5px;
    color: #333;
}

input,
textarea {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    transition: border-color 0.3s;
}

input:focus,
textarea:focus {
    border-color: #007bff;
    outline: none;
}

textarea {
    min-height: 80px;
    resize: vertical;
}

button {
    padding: 12px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
}

button:hover:not(:disabled) {
    background-color: #0056b3;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
.success-message {
    color: #155724;
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
}

.error-message {
    color: #721c24;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
}
```

**Step 13: Send product data to server in "src/app/product/product.component.ts" onSubmit() function.**
```
import { HttpClient, HttpClientModule } from '@angular/common/http'
...
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
....
constructor(private fb: FormBuilder, private http: HttpClient) { }
...
onSubmit() {
    if (this.productForm.valid) {
      this.http.post('http://localhost:3000/product', this.productForm.value).subscribe({
        next: (res) => console.log('Product Created Successfully:', res),
        error: (err) => console.error('Product Creation error:', err)
      });
    }
  }
```

## Install MongoDB and Mongoose
**Step 1: Download MongoDB and Install MongoDB**
Download Community Edition MSI file from https://www.mongodb.com/try/download/community
Run the MSI file and follow the installation wizard.

[Optional]
**Step 2: Download MongoDB Shell (mongosh)**
Download the latest version of MongoDB Shell (mongosh) from https://www.mongodb.com/try/download/shell
Run the installer and follow the installation wizard.

**Step 3: Add MongoDB to PATH**
Add the installation directory of MongoDB to the PATH environment variable.
For example, if you installed MongoDB in "C:\Program Files\MongoDB\Server\8.2", add "C:\Program Files\MongoDB\Server\8.2\bin" to the PATH.

## Create API in Node.js and Express (SERVER)

**Step 1: Install Mongoose package and add MongoDB URL in .env file**
```
npm install mongoose
```

Add MongoDB URL in .env file
```
# Database connection
MONGO_URI=mongodb://localhost:27017/ecommerce
```

**Step 2: Create Model "Product" in "src/app/product/product.model.js"**
```
import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: String,
  price: Number,
  description: String
});

export const Product = model('Product', productSchema);
```

**Step 3: Create Controller file for Product routes in "src/app/product/product.controller.js"**
```
import { Product } from '../model/product.model.js';

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
```


**Step 4: Create Route file for Product routes in "src/app/product/product.route.js"**
```
import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controller/product.controller.js';

const router = express.Router();

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
```

**Step 5: Connect MongoDB and add routes in "src/server.js"**
```
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/products', productRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
```

## Create Product Form in Angular (CLIENT)
Step 1: Create a new component "product-form" in "src/app/product-form/product-form.component.ts"
```
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  product = {
    name: '',
    price: 0,
    description: ''
  };
}
```

## Connect Angular Form with API (CLIENT)
Step 1: Create Environment file "src/environments/environment.ts" using ng command
```
cd /client
ng generate environment
```
"src/environments/environment.ts"
```
export const environment = {
  production: true,
  apiUrl: 'http://localhost:3000/api/products'
};
```

Step 2 : Import environment in "src/app/product/product.component.ts"
```
import { environment } from '../../environments/environment';
...
onSubmit() {
    if (this.productForm.valid) {
      this.http.post(environment.apiUrl, this.productForm.value).subscribe({
        next: (res) => console.log('Product Created Successfully:', res),
        error: (err) => console.error('Product Creation error:', err)
      });
    }
  }
```

Step 3: Add Form Validation in "src/app/product/product.component.html"
```
<form [formGroup]="productForm" (ngSubmit)="onSubmit()">
    <div>
        <label for="name">Name:</label>
        <input id="name" type="text" formControlName="name">
        <div class="error-message" *ngIf="productForm.get('name')?.invalid && productForm.get('name')?.touched">
            Name is required.
        </div>
    </div>
    <div>
        <label for="price">Price:</label>
        <input id="price" type="number" formControlName="price">
        <div class="error-message" *ngIf="productForm.get('price')?.invalid && productForm.get('price')?.touched">
            Price is required.
        </div>
    </div>
    <div>
        <label for="description">Description:</label>
        <textarea id="description" formControlName="description"></textarea>
        <div class="error-message"
            *ngIf="productForm.get('description')?.invalid && productForm.get('description')?.touched">
            Description is required.
        </div>
    </div>
    <button type="submit" [disabled]="productForm.invalid">Submit</button>
</form>
```
To use *ngIf directive for error messages, import CommonModule in "src/app/product/product.component.ts"
```
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
```

Step 4: Add Success/Error Messages in "src/app/product/product.component.html"
```
<div *ngIf="successMessage" class="success-message">{{ successMessage }}</div>
<div *ngIf="errorMessage" class="error-message">{{ errorMessage }}</div>
```

```
export class ProductComponent {

  successMessage: string = '';
  errorMessage: string = '';
  ...
  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';
    if (this.productForm.valid) {
      this.http.post(environment.apiUrl, this.productForm.value).subscribe({
        next: (res) => {
          this.successMessage = 'Product Created Successfully!';
          this.errorMessage = '';
          this.productForm.reset();
        },
        error: (err) => {
          this.errorMessage = 'Product Creation error: ' + err.message;
          this.successMessage = '';
        }
      });
    }
  }
}
```