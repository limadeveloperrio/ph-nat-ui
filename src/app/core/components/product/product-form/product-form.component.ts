import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ProductService, Product } from '../../../shared/product-service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
})
export class ProductFormComponent implements OnInit {
  form!: FormGroup;
  id: string | null = null;
  isNew = false;

  searchIdControl = this.fb.control('');
  showSearchField = false; // ✅ controla se o campo de busca aparece

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit() {
    // Inicializa o formulário
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['']
    });

    // ✅ Verifica a rota inicial
    this.updateShowSearchField(this.router.url);

    // ✅ Atualiza automaticamente quando a rota mudar
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateShowSearchField(event.urlAfterRedirects);
      });

    // Captura ID da rota
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.isNew = this.id === 'new';

      if (!this.isNew && this.id && !this.showSearchField) {
        this.loadProduct(+this.id);
      }
    });
  }

  // ✅ Atualiza variável showSearchField com base na URL
  private updateShowSearchField(url: string) {
    this.showSearchField = url.startsWith('/products/search');
  }

  searchProduct() {
    const searchId = this.searchIdControl.value;
    if (!searchId) return;

    this.productService.getById(+searchId).subscribe({
      next: (product) => {
        if (product) {
          this.form.patchValue(product);
          this.isNew = false;
          this.id = searchId;
        }
      },
      error: () => alert('Produto não encontrado'),
    });
  }

  loadProduct(id: number) {
    this.productService.getById(id).subscribe({
      next: (product) => this.form.patchValue(product),
      error: (err) => console.error('Erro ao carregar produto', err),
    });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const product: Product = this.form.value;

    if (this.isNew) {
      this.productService.create(product).subscribe({
        next: () => this.router.navigate(['/products']),
      });
    } else {
      this.productService.update(+this.id!, product).subscribe({
        next: () => this.router.navigate(['/products']),
      });
    }
  }

  cancel() {
    this.router.navigate(['/products']);
  }
}
