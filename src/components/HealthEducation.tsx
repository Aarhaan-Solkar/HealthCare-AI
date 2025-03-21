import React from 'react';
import { useTranslation } from 'react-i18next';
import { Book, Heart, Utensils, Dumbbell } from 'lucide-react';

const healthTips = [
  {
    category: 'prevention',
    icon: Heart,
    tips: [
      {
        title: 'Regular Health Checkups',
        content: 'Schedule regular health screenings and vaccinations to prevent diseases.',
        image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&q=80&w=600'
      }
    ]
  },
  {
    category: 'lifestyle',
    icon: Book,
    tips: [
      {
        title: 'Sleep Hygiene',
        content: 'Maintain a consistent sleep schedule and create a relaxing bedtime routine.',
        image: 'https://images.unsplash.com/photo-1511295742362-92c96b5cf8f4?auto=format&fit=crop&q=80&w=600'
      }
    ]
  },
  {
    category: 'nutrition',
    icon: Utensils,
    tips: [
      {
        title: 'Balanced Diet',
        content: 'Include a variety of fruits, vegetables, and whole grains in your diet.',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600'
      }
    ]
  },
  {
    category: 'fitness',
    icon: Dumbbell,
    tips: [
      {
        title: 'Regular Exercise',
        content: 'Aim for at least 30 minutes of moderate physical activity daily.',
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600'
      }
    ]
  }
];

export function HealthEducation() {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">{t('education.title')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthTips.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.category} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Icon className="w-6 h-6 text-blue-500" />
                <h3 className="text-lg font-medium">
                  {t(`education.categories.${category.category}`)}
                </h3>
              </div>
              
              {category.tips.map((tip, index) => (
                <div key={index} className="space-y-3">
                  <img
                    src={tip.image}
                    alt={tip.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <h4 className="font-medium">{tip.title}</h4>
                  <p className="text-gray-600">{tip.content}</p>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}