import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Symptom, SymptomOption } from '../types';

const SYMPTOM_OPTIONS: SymptomOption[] = [
  { value: 'headache', label: 'Headache' },
  { value: 'fever', label: 'Fever' },
  { value: 'cough', label: 'Cough' },
  { value: 'fatigue', label: 'Fatigue' },
  { value: 'nausea', label: 'Nausea' },
  { value: 'sneezing', label: 'Sneezing' },
  { value: 'sensitivity_to_light', label: 'Sensitivity to Light' }
];

interface Props {
  onSubmit: (symptoms: Symptom[]) => void;
}

export function SymptomInput({ onSubmit }: Props) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState<string>('');
  const [currentSeverity, setCurrentSeverity] = useState<Symptom['severity']>('moderate');

  const addSymptom = () => {
    if (!currentSymptom) return;
    
    setSelectedSymptoms(prev => [...prev, {
      id: currentSymptom,
      name: SYMPTOM_OPTIONS.find(s => s.value === currentSymptom)?.label || '',
      severity: currentSeverity
    }]);
    
    setCurrentSymptom('');
  };

  const removeSymptom = (id: string) => {
    setSelectedSymptoms(prev => prev.filter(s => s.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSymptoms.length > 0) {
      onSubmit(selectedSymptoms);
      setSelectedSymptoms([]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Describe Your Symptoms</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <select
            value={currentSymptom}
            onChange={(e) => setCurrentSymptom(e.target.value)}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a symptom</option>
            {SYMPTOM_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <select
            value={currentSeverity}
            onChange={(e) => setCurrentSeverity(e.target.value as Symptom['severity'])}
            className="w-32 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="mild">Mild</option>
            <option value="moderate">Moderate</option>
            <option value="severe">Severe</option>
          </select>
          
          <button
            type="button"
            onClick={addSymptom}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus size={24} />
          </button>
        </div>

        <div className="space-y-2">
          {selectedSymptoms.map(symptom => (
            <div
              key={symptom.id}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium">{symptom.name}</span>
                <span className={`text-sm px-2 py-1 rounded ${
                  symptom.severity === 'mild' ? 'bg-green-100 text-green-800' :
                  symptom.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {symptom.severity}
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeSymptom(symptom.id)}
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={selectedSymptoms.length === 0}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Get Diagnosis
        </button>
      </form>
    </div>
  );
}