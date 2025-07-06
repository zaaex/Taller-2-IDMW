"use client";

import { useProductStore } from "@/stores/ProductStore";

export const useFilters = () => {
  const {filters, setFilters } =
    useProductStore();

  const handleSort = (orderBy: "price" | "priceDesc") => {
    setFilters({ ...filters, orderBy, pageNumber: 1 });
  };

  const handleCategoryFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setFilters({...filters, categories: category, pageNumber:1});
  };

  const handleBrandFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const brand = e.target.value;
    setFilters({...filters, brands: brand, pageNumber: 1});
  };

  const nextPage = () => {
    setFilters({pageNumber: filters.pageNumber + 1});
  };

  const prevPage = () => {
    if(filters.pageNumber > 1){
        setFilters({pageNumber: filters.pageNumber - 1});
    }

  };

  return {
    handleSort,
    handleCategoryFilter, 
    handleBrandFilter,
    nextPage,
    prevPage
  };
};
