import { Skeleton } from "@/components/ui/skeleton";

export const LoginViewSkeleton = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-8 font-[Afacad]">
      <div className="w-full max-w-md bg-[#75BEF0] rounded-2xl shadow-xl px-8 py-10">
        {/* Título skeleton */}
        <div className="flex justify-center mb-6">
          <Skeleton className="h-8 w-40 md:h-10 md:w-48" />
        </div>

        {/* Ícono skeleton */}
        <div className="flex justify-center mb-6">
          <Skeleton className="w-24 h-24 md:w-36 md:h-36 rounded-full" />
        </div>

        <div className="space-y-6">
          {/* Campo email skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 md:h-5 md:w-36" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>

          {/* Campo password skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 md:h-5 md:w-28" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>

          {/* Botón skeleton */}
          <Skeleton className="h-10 w-full rounded-lg" />

          {/* Texto de registro skeleton */}
          <div className="flex justify-center">
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
      </div>
    </div>
  );
};
