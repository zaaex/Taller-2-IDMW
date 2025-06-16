import { Product } from "../../interfaces/Product";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <div
      className="bg-[#67B8EF] shadow-md rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition w-full sm:w-[250px]"
      onClick={onClick}
    >
      <div className="relative w-full h-40 sm:h-48 bg-gray-200 flex items-center justify-center">
        <Image
          src="/Producto.jpg"
          alt={product.name}
          width={200}
          height={200}
          className="object-contain"
        />
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-base sm:text-lg"> {product.name}</h3>
        <p className="mt-1 sm:mt-2 text-black font-bold text-sm sm:text-base">
          ${product.price}
        </p>
      </div>
    </div>
  );
};
