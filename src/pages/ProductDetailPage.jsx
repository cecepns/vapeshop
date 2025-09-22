import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productsAPI, settingsAPI } from '../utils/api';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [settings, setSettings] = useState({
    whatsapp: '+62 857-5234-8507'
  });
  const [settingsLoading, setSettingsLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
    fetchRelatedProducts();
    fetchSettings();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productsAPI.getById(id);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const response = await productsAPI.getAll(1, 4);
      setRelatedProducts(response.data.data.filter(p => p.id !== parseInt(id)));
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await settingsAPI.get();
      if (response.data) {
        setSettings({
          whatsapp: response.data.whatsapp || settings.whatsapp
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setSettingsLoading(false);
    }
  };

  const handleWhatsAppOrder = () => {
    const message = `Halo, saya tertarik dengan produk:\n\n${product.name}\nHarga: Rp ${product.price?.toLocaleString('id-ID')}\n\nMohon informasi lebih lanjut.`;
    // Remove any non-numeric characters from WhatsApp number
    const cleanWhatsapp = settings.whatsapp.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-gray-300 h-96 rounded-lg"></div>
              <div className="space-y-4">
                <div className="bg-gray-300 h-8 rounded"></div>
                <div className="bg-gray-300 h-6 rounded"></div>
                <div className="bg-gray-300 h-32 rounded"></div>
                <div className="bg-gray-300 h-12 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Produk tidak ditemukan</h1>
          <Link to="/products" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
            Kembali ke Produk
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" data-aos="fade-up">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link to="/" className="hover:text-primary-600">Home</Link></li>
            <li><span>/</span></li>
            <li><Link to="/products" className="hover:text-primary-600">Products</Link></li>
            <li><span>/</span></li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div data-aos="fade-right">
            <img
              src={`https://api-inventory.isavralabel.com/vapeshop/${product.image}`}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Product Info */}
          <div data-aos="fade-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-4xl font-bold text-primary-600 mb-6">
              Rp {product.price?.toLocaleString('id-ID')}
            </p>

            {/* Stock Status */}
            <div className="flex items-center mb-6">
              <span className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm font-medium">
                {product.stock > 0 ? `Stok: ${product.stock}` : 'Habis'}
              </span>
            </div>

            {/* Description */}
            <div className="prose max-w-none mb-8">
              <h3 className="text-lg font-semibold mb-3">Deskripsi Produk</h3>
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-secondary-600 hover:bg-secondary-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                disabled={product.stock === 0}
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                {product.stock > 0 ? 'Pesan via WhatsApp' : 'Stok Habis'}
              </button>

              <div className="grid grid-cols-2 gap-4">
                <Link
                  to="/products"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-center"
                >
                  Lihat Produk Lain
                </Link>
                <Link
                  to="/contact"
                  className="bg-primary-100 hover:bg-primary-200 text-primary-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-center"
                >
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div data-aos="fade-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Produk Terkait</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200" data-aos="fade-up" data-aos-delay={index * 100}>
                  <img
                    src={`https://api-inventory.isavralabel.com/vapeshop/${relatedProduct.image}`}
                    alt={relatedProduct.name}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="text-sm font-semibold mb-2 line-clamp-2">{relatedProduct.name}</h3>
                    <p className="text-lg font-bold text-primary-600 mb-3">
                      Rp {relatedProduct.price?.toLocaleString('id-ID')}
                    </p>
                    <Link
                      to={`/products/${relatedProduct.id}`}
                      className="inline-block bg-primary-600 hover:bg-primary-700 text-white text-sm px-3 py-2 rounded transition-colors duration-200"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;