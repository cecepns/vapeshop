import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productsAPI } from "../utils/api";

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await productsAPI.getAll(1, 6);
      setFeaturedProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching featured products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-600 to-black-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center" data-aos="fade-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-accent-500">Vape Shop</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Toko vape terpercaya di Samarinda dengan koleksi terlengkap
            </p>
            <Link
              to="/products"
              className="inline-block bg-accent-500 hover:bg-accent-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-200 transform hover:scale-105"
            >
              Lihat Produk
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Mengapa Memilih Kami?
            </h2>
            <p className="text-gray-600 text-lg">
              Kami menyediakan produk berkualitas dengan pelayanan terbaik
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="bg-primary-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Produk Berkualitas</h3>
              <p className="text-gray-600">
                Semua produk original dan bergaransi resmi
              </p>
            </div>

            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="bg-secondary-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-secondary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Pelayanan Cepat</h3>
              <p className="text-gray-600">Respon cepat dan pelayanan ramah</p>
            </div>

            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="bg-accent-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-accent-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Lokasi Strategis</h3>
              <p className="text-gray-600">
                Mudah diakses di pusat kota Samarinda
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Produk Unggulan
            </h2>
            <p className="text-gray-600 text-lg">
              Koleksi produk terbaru dan terpopuler
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 animate-pulse"
                >
                  <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                  <div className="bg-gray-300 h-4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-6 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="bg-slate-50 w-full h-64">
                    {!!product.image && (
                      <img
                        src={`https://api-inventory.isavralabel.com/vapeshop/${product.image}`}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">
                      {product.name}
                    </h3>
                    <p className="text-2xl font-bold text-primary-600 mb-4">
                      Rp {product.price?.toLocaleString("id-ID")}
                    </p>
                    <Link
                      to={`/products/${product.id}`}
                      className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded transition-colors duration-200"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12" data-aos="fade-up">
            <Link
              to="/products"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-200"
            >
              Lihat Semua Produk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
