import {Product} from "@/interfaces/Product";
import { ProductFilters, ProductServices } from "@/services/ProductServices";
import {create} from "zustand";

interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
    filters: ProductFilters;
    fetchProducts: () => Promise<void>;
    setFilters: (filters: Partial<ProductFilters>) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
    products:[],
    loading: false,
    error: null,
    filters:{pageNumber:1, pageSize: 10},

    fetchProducts: async () => {
        set({loading: true, error:null});
        try{
            const {filters} = get();
            const data = await ProductServices.fetchProducts(filters);
            console.log("Productos obtenidos:", data);

            set({products: data, loading: false});
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch(error: any){
            set({loading:false, error: error.message || "Error al obtener los productos"});

        }
    },
    setFilters: (newFilters) => set((state) => ({
        filters: {...state.filters, ...newFilters},
    })),
}))