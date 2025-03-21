import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Diagnosis } from '../types';

interface Props {
  diagnosis: Diagnosis;
  onClose: () => void;
}

export function DiagnosisResult({ diagnosis, onClose }: Props) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-4 mb-6">
        {diagnosis.prediction.confidence >= 70 ? (
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        ) : (
          <AlertCircle className="w-8 h-8 text-yellow-500" />
        )}
        <h2 className="text-2xl font-semibold">Diagnosis Results</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Likely Condition</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-xl font-semibold">{diagnosis.prediction.condition}</span>
              <span className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                {diagnosis.prediction.confidence}% confidence
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Reported Symptoms</h3>
          <div className="grid grid-cols-2 gap-2">
            {diagnosis.symptoms.map(symptom => (
              <div
                key={symptom.id}
                className="bg-gray-50 p-3 rounded-lg flex items-center justify-between"
              >
                <span>{symptom.name}</span>
                <span className={`text-sm px-2 py-1 rounded ${
                  symptom.severity === 'mild' ? 'bg-green-100 text-green-800' :
                  symptom.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {symptom.severity}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Recommendations</h3>
          <ul className="space-y-2">
            {diagnosis.prediction.recommendations.map((rec, index) => (
              <li key={index} className="bg-gray-50 p-3 rounded-lg">
                {rec}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}