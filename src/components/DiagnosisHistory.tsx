import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import { Diagnosis } from '../types';

interface Props {
  diagnoses: Diagnosis[];
  onSelect: (diagnosis: Diagnosis) => void;
}

export function DiagnosisHistory({ diagnoses, onSelect }: Props) {
  if (diagnoses.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-8">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-6 h-6 text-gray-500" />
        <h2 className="text-2xl font-semibold">Previous Diagnoses</h2>
      </div>

      <div className="space-y-3">
        {diagnoses.map(diagnosis => (
          <button
            key={diagnosis.id}
            onClick={() => onSelect(diagnosis)}
            className="w-full text-left bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-lg">{diagnosis.prediction.condition}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(diagnosis.timestamp).toLocaleDateString()} at{' '}
                  {new Date(diagnosis.timestamp).toLocaleTimeString()}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}