import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

// Product interface
export interface ProductItem {
  id?: string | number;
  name: string;
  summary: string;
  power: string;
  images: string[]; // Firebase URLs
  specifications?: {
    dimensions?: string;
    weight?: string;
    voltage?: string;
    efficiency?: string;
    useCase?: string;
    warranty?: string;
  };
  features?: string[];
  technicalSpecs?: {
    [key: string]: string;
  };
  brochureUrl?: string;
  createdOn?: string;
  updatedOn?: string;
}

// Redux state type
interface ProductState {
  products: ProductItem[];
  isLoading: boolean;
  error: string | null;
  selectedProduct: ProductItem | null;
}

// Initial state
const initialState: ProductState = {
  products: [],
  isLoading: false,
  error: null,
  selectedProduct: null,
};
export { fileToBase64 };
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}


// Slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    clearProducts: (state) => {
      state.products = [];
    },
  },
});

export const {
  setProducts,
  setIsLoading,
  setError,
  setSelectedProduct,
  clearSelectedProduct,
  clearProducts,
} = productSlice.actions;

//
// ✅ Async Thunks using JSON and base64 for image upload
//

// Fetch all products
export const fetchProducts = () => async (dispatch: Dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const res = await axios.get("/api/routes/products");
    dispatch(setProducts(res.data.data));
  } catch (error: any) {
    dispatch(setError(error?.message || "Failed to fetch products."));
  }
};

// Fetch product by ID
export const fetchProductById = (id: string) => async (dispatch: Dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const res = await axios.get(`/api/routes/products/${id}`);
    console.log("Fetching product ID:", id);
    dispatch(setSelectedProduct(res.data.data));
  } catch (error: any) {
    dispatch(setError(error?.message || "Failed to fetch product."));
  }
};

// Add product (JSON + base64)
export const addProduct = (formData: FormData) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.post("/api/routes/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(setProducts(res.data.data));
  } catch (error: any) {
    dispatch(setError(error?.message || "Failed to add product."));
  }
};

// Update product (JSON + optional base64 images)
export const updateProduct = (formData: FormData, id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.put(`/api/routes/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(setProducts(res.data.data));

  } catch (error: any) {
    dispatch(setError(error?.message || "Failed to update product."));
  }
};

// Delete product
export const deleteProduct = (id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.delete(`/api/routes/products/${id}`);
    dispatch(setProducts(res.data.data));
  } catch (error: any) {
    dispatch(setError(error?.message || "Failed to delete product."));
  }
};





//
// ✅ Selectors
//
export const selectProducts = (state: RootState) => state.product.products;
export const selectSelectedProduct = (state: RootState) =>
  state.product.selectedProduct;
export const selectIsLoading = (state: RootState) => state.product.isLoading;
export const selectError = (state: RootState) => state.product.error;

export default productSlice.reducer;
