import { UserProps } from "./login";

// ------------------- APP ------------------------ //
export interface ShowModal {
  type?: "add" | "fix" | "delete" | "detail" | "download";
  show: boolean;
  data?: any;
  title?: string;
  onConfirm?: () => void;
}

// ------------------- API ------------------------ //
export interface ResponseFormat<T> {
  status: string;
  data: T;
  message: string;
}
export interface SignUpInput {
  usr_name: string;
  password: string;
}

export interface SignUpOutput {}

export interface GetProductInput {
  product_code?: string;
  product_bar_code?: string;
}

export interface GetProductOutput {
  id?: number;
  product_code?: string;
  product_bar_code?: string;
  product_name?: string;
  product_description?: string;
  product_image_url?: string;
  product_price_origin?: number;
  product_price_sell?: number;
  product_slug?: string;
  product_quantity?: number;
  product_manufacture_date?: string;
  product_expired_date?: string;
  categories?: CategoriesOutput;
  createdAt?: string;
  updatedAt?: string;
  is_gen_product_bar_code?: number;
}

export interface DeleteProductInput {
  product_code?: string;
}

export interface GetAllListInput {
  searchText?: string;
  limit: string;
  sortOrder: string;
  sortBy: string;
  page: string;
  filter: any;
  select: any;
  priceMin?: number;
  priceMax?: number;
}

export interface GetProductsOutput {
  products: GetProductOutput[];
  total: number;
}

export interface CategoriesOutput {
  id: number;
  image: string;
  title: string;
}
export interface CreateAndUpdateProductsInput {
  product_bar_code: string;
  product_code: string;
  product_name: string;
  product_description: string;
  product_image_url: string;
  product_price_origin: number;
  product_price_sell: number;
  product_quantity: number;
  product_manufacture_date: string;
  product_expired_date: string;
  categories: number;
}

export interface CreateProductsOutput {}
export interface AddNewCartsItemProduct {
  product_code: string;
  quantity: number;
}
// Carts
export interface AddNewCartsInput {
  products: AddNewCartsItemProduct[];
}

export interface AddNewCartsOutput {
  cart_state: string;
  cart_products: string;
  usr_id: string;
  id: number;
  cart_count_product: number;
}

export interface AddToCartsInput {
  id: number;
  products: AddNewCartsItemProduct[];
}

export interface AddToCartsOutput {}

export interface UpdateCartsInput {
  id: number;
  products: AddNewCartsItemProduct[];
}

export interface GetDetailCartsInput {
  id: number;
}

export interface DeleteCartsInput {
  id: number;
}

export interface CartProducts {
  product_code: string;
  quantity: number;
}

export interface GetAllCartOutput {
  products: GetCartsOutput[];
  total: number;
}

export interface GetCartsOutput {
  id?: number;
  cart_state?: string;
  cart_products?: string;
  cart_count_product?: number;
  createdAt?: string;
  updatedAt?: string;
  cart_code?: string;
  user: UserProps;
}

// ---------- checkout ---------- //
export interface CheckoutIdInput {
  id?: number;
  cart_Code?: number;
}

export interface CartProductCheckout {
  id: number;
  product_code: string;
  product_name: string;
  product_price_sell: number;
  product_quantity_order: number;
  product_total_price: number;
}

export interface CheckoutReviewOutput {
  cartProducts: CartProductCheckout[];
  totalQuantity: number;
  totalPrice: number;
}

// ---------- BILLS ------------- //
export interface BillData {
  id: number;
  total_price: number;
  total_customer_price: string;
  total_refund_price: string;
  status: string;
  cart_products: CartProductCheckout[];
  createdAt: string;
  updatedAt: string;
  bills_code: string;
  cart: GetCartsOutput;
}
export interface GetBillsOutput {
  products: BillData[];
  total: number;
}

export interface GetUsersOutput {
  users: UserProps[];
  total: number;
}

export interface GetBillInput {
  id: number;
}

export interface GetBillOutput extends BillData {}

//Overview
export interface Top5ListProduct {
  id: number;
  product_code: string;
  product_name: string;
  product_price_sell: number;
  product_price_origin: number;
  product_quantity_order: number;
  product_total_price: number;
}

export interface GetOverViewOutput {
  totalProfit: number;
  totalRevenue: number;
  quantityBills: number;
  quantityProduct: number;
  listAllProduct: Top5ListProduct[];
}
