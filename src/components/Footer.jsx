import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { settingsAPI } from '../utils/api';

const Footer = () => {
  const [settings, setSettings] = useState({
    shop_name: 'Vape Shop',
    address: 'Jl. Ciptomangunkusumo No. 2a Rt. 9\nKel. Simpang Tiga, Loa janan ilir\nSamarinda, Kalimantan Timur',
    whatsapp: '+62 857-5234-8507',
    email: 'info@vapeshop.com'
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
          email: response.data.email || settings.email
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setSettingsLoading(false);
    }
  }, [settings.shop_name, settings.address, settings.whatsapp, settings.email]);

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