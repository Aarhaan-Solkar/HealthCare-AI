import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Search } from 'lucide-react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries: ("places" | "geometry" | "drawing" | "visualization")[] = ["places"];

interface Hospital {
  id: string;
  name: string;
  address: string;
  distance: string;
  position: {
    lat: number;
    lng: number;
  };
}

const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'Central Hospital',
    address: '123 Healthcare Ave',
    distance: '2.5 km',
    position: { lat: 40.7128, lng: -74.0060 }
  },
  {
    id: '2',
    name: 'Medical Center',
    address: '456 Wellness Blvd',
    distance: '3.8 km',
    position: { lat: 40.7148, lng: -74.0068 }
  }
];

export function HospitalFinder() {
  const { t } = useTranslation();
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
    libraries
  });

  const mapCenter = { lat: 40.7128, lng: -74.0060 };

  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-semibold">Nearby Hospitals</h2>
        </div>

        <div className="flex gap-6">
          <div className="w-1/3">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search hospitals..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-3">
              {mockHospitals.map(hospital => (
                <button
                  key={hospital.id}
                  onClick={() => setSelectedHospital(hospital)}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    selectedHospital?.id === hospital.id
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <h3 className="font-medium">{hospital.name}</h3>
                  <p className="text-sm text-gray-600">{hospital.address}</p>
                  <p className="text-sm text-blue-600">{hospital.distance}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="w-2/3 h-[500px] rounded-lg overflow-hidden">
            <GoogleMap
              zoom={14}
              center={mapCenter}
              mapContainerClassName="w-full h-full"
            >
              {mockHospitals.map(hospital => (
                <Marker
                  key={hospital.id}
                  position={hospital.position}
                  onClick={() => setSelectedHospital(hospital)}
                />
              ))}
            </GoogleMap>
          </div>
        </div>
      </div>
    </div>
  );
}