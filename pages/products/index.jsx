import Link from "next/link";
import Image from "next/image";

export default function ProductsPage({ products }) {

  if (!products || products.length === 0) {
    return <div className="p-6 text-center text-gray-600">Loading products or API error...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Products Page</h1>
        <Link href="/" className="text-blue-600 hover:underline font-medium">
          &larr; Back to Home
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border border-gray-200 rounded-lg p-4 flex flex-col justify-between hover:shadow-md transition-shadow bg-white">
            <div>
              <div className="w-full flex justify-center mb-4 bg-gray-50 rounded-md p-2">
                <Image 
                  src={product.image} 
                  alt={product.title} 
                  width={300} 
                  height={450}
                  className="object-contain h-48 w-full"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {product.title}
              </h3>
            </div>
            
            <div className="mt-4">
              <p className="text-xl font-bold text-gray-900 mb-3">${product.price}</p>
              <Link 
                href={`/products/${product.id}`} 
                className="block text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) {
      return { props: { products: [] } };
    }

    const products = await res.json();

    return {
      props: {
        products,
      },
      revalidate: 10, 
    };
  } catch (error) {
    console.error("Build fetch failed:", error);
    return {
      props: {
        products: [], 
      },
    };
  }
}