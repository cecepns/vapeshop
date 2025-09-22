import { useState, useEffect } from 'react';
import { settingsAPI } from '../../utils/api';
import Swal from 'sweetalert2';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    shop_name: 'Vape Shop',
    address: 'Jl. Ciptomangunkusumo No. 2a Rt. 9\nKel. Simpang Tiga, Loa janan ilir\nSamarinda, Kalimantan Timur',
    phone: '+62 857-5234-8507',
    email: 'info@vapeshop.com',
    about: 'Vape Shop Samarinda adalah toko vape terpercaya yang menyediakan produk-produk berkualitas tinggi untuk para penggemar vaping di Kalimantan Timur.',
    maps_embed: '',
    instagram: '',
    facebook: '',
    whatsapp: '+62 857-5234-8507'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await settingsAPI.get();
      if (response.data) {
        setSettings({...settings, ...response.data});
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await settingsAPI.update(settings);
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Pengaturan berhasil disimpan',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Gagal menyimpan pengaturan',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="bg-gray-300 h-8 w-64 rounded"></div>
          <div className="bg-gray-300 h-96 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>
        <p className="text-gray-600">Kelola informasi toko dan kontak</p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Informasi Dasar</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Toko
                </label>
                <input
                  type="text"
                  name="shop_name"
                  value={settings.shop_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Informasi Kontak</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="text"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp
                </label>
                <input
                  type="text"
                  name="whatsapp"
                  value={settings.whatsapp}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alamat
              </label>
              <textarea
                name="address"
                rows={3}
                value={settings.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Media Sosial</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram
                </label>
                <input
                  type="url"
                  name="instagram"
                  value={settings.instagram}
                  onChange={handleChange}
                  placeholder="https://instagram.com/vapeshop"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facebook
                </label>
                <input
                  type="url"
                  name="facebook"
                  value={settings.facebook}
                  onChange={handleChange}
                  placeholder="https://facebook.com/vapeshop"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          {/* About */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tentang Kami
            </label>
            <textarea
              name="about"
              rows={4}
              value={settings.about}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Maps */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Google Maps Embed Code
            </label>
            <textarea
              name="maps_embed"
              rows={3}
              value={settings.maps_embed}
              onChange={handleChange}
              placeholder="<iframe src=... ></iframe>"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              Masukkan kode embed dari Google Maps
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;