import { useState, useEffect, useCallback } from "react";
import { settingsAPI } from "../utils/api";

const ContactPage = () => {
  const [settings, setSettings] = useState({
    address: 'Jl. Ciptomangunkusumo No. 2a Rt. 9\nKel. Simpang Tiga, Loa janan ilir\nSamarinda, Kalimantan Timur',
    whatsapp: '+62 857-5234-8507',
    phone: '+62 857-5234-8507'
  });
  const [settingsLoading, setSettingsLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      const response = await settingsAPI.get();
      if (response.data) {
        setSettings({
          address: response.data.address || settings.address,
          whatsapp: response.data.whatsapp || settings.whatsapp,
          phone: response.data.phone || settings.phone
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setSettingsLoading(false);
    }
  }, [settings.address, settings.whatsapp, settings.phone]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);


  const handleWhatsAppClick = () => {
    const message =
      "Halo, saya ingin bertanya tentang produk vape yang tersedia.";
    // Remove any non-numeric characters from WhatsApp number
    const cleanWhatsapp = settings.whatsapp.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Hubungi Kami
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Kami siap membantu Anda dengan pertanyaan apapun tentang produk atau
            layanan kami
          </p>
        </div>

        <div className="grid grid-cols-2">
          {/* Contact Information */}
          <div data-aos="fade-right">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Informasi Kontak
            </h2>

            <div className="space-y-6 w-full">
              <div className="flex items-start">
                <div className="bg-primary-100 rounded-full p-3 mr-4">
                  <svg
                    className="w-6 h-6 text-primary-600"
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
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Alamat Toko
                  </h3>
                  <p className="text-gray-600">
                    {settingsLoading ? (
                      <span className="animate-pulse">Loading...</span>
                    ) : (
                      settings.address.split('\n').map((line, index) => (
                        <span key={index}>
                          {line}
                          {index < settings.address.split('\n').length - 1 && <br />}
                        </span>
                      ))
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-secondary-100 rounded-full p-3 mr-4">
                  <svg
                    className="w-6 h-6 text-secondary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    WhatsApp Admin
                  </h3>
                  <p className="text-gray-600">
                    {settingsLoading ? (
                      <span className="animate-pulse">Loading...</span>
                    ) : (
                      settings.whatsapp
                    )}
                  </p>
                  <button
                    onClick={handleWhatsAppClick}
                    className="text-secondary-600 hover:text-secondary-700 font-medium mt-1"
                  >
                    Chat sekarang →
                  </button>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-accent-100 rounded-full p-3 mr-4">
                  <svg
                    className="w-6 h-6 text-accent-600"
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
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Jam Operasional
                  </h3>
                  <p className="text-gray-600">
                    Senin - Minggu
                    <br />
                    09:00 - 21:00 WIB
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="max-w-fit max-h-fit mt-8 p-6 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-4">
              Hubungi Kami Langsung
            </h3>
            <div className="space-y-3">
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-secondary-600 hover:bg-secondary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                WhatsApp
              </button>
              <a
                href={`tel:${settings.phone.replace(/\D/g, '')}`}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
                Telepon
              </a>
            </div>
          </div>

          {/* Contact Form */}
          {/* <div data-aos="fade-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Kirim Pesan</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="nama@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  No. WhatsApp
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="08xxxxxxxxxx"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Tuliskan pesan atau pertanyaan Anda..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200"
              >
                {loading ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </form>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
