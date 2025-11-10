import { useState, useEffect, useCallback } from 'react';
import { settingsAPI } from '../utils/api';
import VapeShopStore from '../assets/logo.jpeg'

const AboutPage = () => {
  const [settings, setSettings] = useState({
    address: 'Jl. Ciptomangunkusumo No. 2a Rt. 9\nKel. Simpang Tiga, Loa janan ilir\nSamarinda, Kalimantan Timur',
    whatsapp: '+62 857-5234-8507',
    about: 'Vape Shop Samarinda adalah toko vape terpercaya yang menyediakan produk-produk berkualitas tinggi untuk para penggemar vaping di Kalimantan Timur.',
    maps_embed: ''
  });
  const [settingsLoading, setSettingsLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      const response = await settingsAPI.get();
      if (response.data) {
        setSettings({
          address: response.data.address || settings.address,
          whatsapp: response.data.whatsapp || settings.whatsapp,
          about: response.data.about || settings.about,
          maps_embed: response.data.maps_embed || settings.maps_embed
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setSettingsLoading(false);
    }
  }, [settings.address, settings.whatsapp, settings.about, settings.maps_embed]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Tentang Kami</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {settingsLoading ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              settings.about
            )}
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div data-aos="fade-right">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Cerita Kami</h2>
            <p className="text-gray-600 mb-4">
              Nama "Vape Loajanan Vape Shop" yang disingkat menjadi VL Vape Shop, hadir dengan passion untuk menyediakan alternatif yang lebih baik bagi para perokok. VL Vape Shop hadir sebagai solusi terpercaya di dunia vaping.
            </p>
            <p className="text-gray-600 mb-4">
              Kami berkomitmen untuk menyediakan produk-produk original, berkualitas dan aman dengan harga terjangkau. Tim kami yang berpengalaman siap membantu anda menemukan produk yang sesuai dengan kebutuhan.
            </p>
            <p className="text-gray-600">
              Dengan lokasi strategis yang mudah diakses dan siap melayani anda dengan sepenuh hati.
            </p>
          </div>
          <div data-aos="fade-left">
            <img 
              src={VapeShopStore}
              alt="Vape Shop Store" 
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-16" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Nilai-Nilai Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Kualitas Terjamin</h3>
              <p className="text-gray-600">
                Semua produk yang kami jual adalah produk original dengan garansi resmi 
                dari distributor terpercaya.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-secondary-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Pelayanan Prima</h3>
              <p className="text-gray-600">
                Tim customer service kami yang ramah dan berpengalaman siap membantu 
                Anda kapan saja.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-amber-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Harga Kompetitif</h3>
              <p className="text-gray-600">
                Kami menawarkan harga terbaik dengan kualitas terjamin, memberikan 
                value terbaik untuk pelanggan.
              </p>
            </div>
          </div>
        </div>

        {/* Location & Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12" data-aos="fade-up">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Lokasi & Kontak</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-primary-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <div>
                  <p className="font-semibold">Alamat:</p>
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

              <div className="flex items-center">
                <svg className="w-6 h-6 text-primary-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <div>
                  <p className="font-semibold">WhatsApp Admin:</p>
                  <p className="text-gray-600">
                    {settingsLoading ? (
                      <span className="animate-pulse">Loading...</span>
                    ) : (
                      settings.whatsapp
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <svg className="w-6 h-6 text-primary-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                  <p className="font-semibold">Jam Operasional:</p>
                  <p className="text-gray-600">Senin - Minggu: 09:00 - 21:00</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Temukan Kami</h2>
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              {settingsLoading ? (
                <p className="text-gray-500 animate-pulse">Loading maps...</p>
              ) : settings.maps_embed ? (
                <div 
                  className="w-full h-full rounded-lg"
                  dangerouslySetInnerHTML={{ __html: settings.maps_embed }}
                />
              ) : (
                <p className="text-gray-500">
                  Maps will be integrated here<br />
                  (Google Maps embed)
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;