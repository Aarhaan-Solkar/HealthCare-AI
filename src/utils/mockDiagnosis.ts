import { Diagnosis, Symptom } from '../types';

const conditions = [
  {
    name: 'Common Cold',
    symptoms: ['headache', 'fever', 'cough', 'fatigue'],
    recommendations: [
      'Rest and stay hydrated',
      'Take over-the-counter cold medications',
      'Use a humidifier',
      'Monitor symptoms for 7-10 days'
    ]
  },
  {
    name: 'Seasonal Allergies',
    symptoms: ['sneezing', 'headache', 'fatigue'],
    recommendations: [
      'Take antihistamines',
      'Avoid known allergens',
      'Use air purifiers',
      'Consider consulting an allergist'
    ]
  },
  {
    name: 'Migraine',
    symptoms: ['headache', 'nausea', 'sensitivity_to_light'],
    recommendations: [
      'Rest in a quiet, dark room',
      'Apply cold or warm compresses',
      'Stay hydrated',
      'Consider prescribed medications'
    ]
  }
];

export function generateDiagnosis(symptoms: Symptom[]): Diagnosis {
  const symptomNames = symptoms.map(s => s.id);
  
  // Simple matching algorithm
  let bestMatch = {
    condition: conditions[0],
    score: 0
  };

  conditions.forEach(condition => {
    const matchingSymptoms = condition.symptoms.filter(s => 
      symptomNames.includes(s)
    );
    const score = matchingSymptoms.length / condition.symptoms.length;
    
    if (score > bestMatch.score) {
      bestMatch = { condition, score };
    }
  });

  return {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    symptoms,
    prediction: {
      condition: bestMatch.condition.name,
      confidence: Math.round(bestMatch.score * 100),
      recommendations: bestMatch.condition.recommendations
    }
  };
}