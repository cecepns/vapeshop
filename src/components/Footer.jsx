import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { settingsAPI } from '../utils/api';

const Footer = () => {
  const [settings, setSettings] = useState({
    shop_name: 'Vape Shop',
    address: 'Jl. Ciptomangunkusumo No. 2a Rt. 9\nKel. Simpang Tiga, Loa janan ilir\nSamarinda, Kalimantan Timur',
    whatsapp: '+62 857-5234-8507',
    email: 'info@vapeshop.com',
    instagram: '',
    facebook: ''
  });
  const [settingsLoading, setSettingsLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      const response = await settingsAPI.get();
      if (response.data) {
        setSettings({
          shop_name: response.data.shop_name || settings.shop_name,
          address: response.data.address || settings.address,
          whatsapp: response.data.whatsapp || settings.whatsapp,
          email: response.data.email || settings.email,
          instagram: response.data.instagram || settings.instagram,
          facebook: response.data.facebook || settings.facebook
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setSettingsLoading(false);
    }
  }, [settings.shop_name, settings.address, settings.whatsapp, settings.email, settings.instagram, settings.facebook]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-primary-400 mb-4">
              {settingsLoading ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                settings.shop_name
              )}
            </h3>
            <p className="text-gray-300 mb-4">
              Toko vape terpercaya di Samarinda dengan koleksi produk berkualitas tinggi
              dan pelayanan terbaik untuk para vapers.
            </p>
            <div className="space-y-2">
              <p className="text-gray-300">
                <span className="font-semibold">Alamat:</span><br />
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
              <p className="text-gray-300">
                <span className="font-semibold">WhatsApp:</span> {
                  settingsLoading ? (
                    <span className="animate-pulse">Loading...</span>
                  ) : (
                    settings.whatsapp
                  )
                }
              </p>
              
              {/* Social Media Icons */}
              <div className="flex items-center space-x-4 mt-4 pt-4">
                {!settingsLoading && settings.instagram && (
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-primary-400 transition-colors"
                    title="Instagram"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                    </svg>
                  </a>
                )}
                {!settingsLoading && settings.facebook && (
                  <a
                    href={settings.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-primary-400 transition-colors"
                    title="Facebook"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-primary-400 transition-colors">About</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-primary-400 transition-colors">Products</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-primary-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2">
              <p className="text-gray-300">
                Admin: {settingsLoading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : (
                  settings.whatsapp
                )}
              </p>
              <p className="text-gray-300">
                Email: {settingsLoading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : (
                  settings.email
                )}
              </p>
              <p className="text-gray-300">Jam Buka: 09:00 - 21:00</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-400">
            © 2025 Vape Shop Samarinda. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;