import Link from "next/link";
import Image from "next/image";

export default function ProductDetailsPage({ product }) {
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Product not found!</h2>
        <Link href="/products" className="text-blue-600 hover:underline">
          &larr; Back to Products List
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <div className="mb-6">
        <Link href="/products" className="text-blue-600 hover:underline inline-flex items-center gap-1 font-medium">
          &larr; Back to Products List
        </Link>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-sm">

        <div className="w-full flex justify-center items-center bg-gray-50 rounded-lg p-6 min-h-[300px]">
          <div className="relative w-full h-80">
            <Image 
              src={product.image} 
              alt={product.title} 
              fill
              className="object-contain"
              sizes="(max-w-768px) 100vw, 400px"
              priority
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 bg-gray-100 px-2.5 py-1 rounded-md w-fit">
            {product.category}
          </span>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 ">
            {product.title}
          </h1>

          <div className="border-b border-gray-100 my-2"></div>
          
          <p className="text-2xl font-extrabold text-emerald-600 my-4">
            ${product.price}
          </p>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
              Description
            </h4>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {product.description}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await res.json();

    return {
      props: {
        product, 
      },
    };
  } catch (error) {
    console.error("Error fetching product data:", error);
    return {
      props: {
        product: null,
      },
    };
  }
}