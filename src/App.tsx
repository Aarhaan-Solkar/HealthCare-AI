import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Stethoscope, Settings as SettingsIcon, MessageSquare, LogOut } from 'lucide-react';
import { SymptomInput } from './components/SymptomInput';
import { DiagnosisResult } from './components/DiagnosisResult';
import { DiagnosisHistory } from './components/DiagnosisHistory';
import { Settings } from './components/Settings';
import { Chatbot } from './components/Chatbot';
import { Login } from './components/Login';
import { getCurrentUser, logout } from './utils/auth';
import { generateDiagnosis } from './utils/mockDiagnosis';
import { Diagnosis, Symptom } from './types';

function Dashboard() {
  const [currentDiagnosis, setCurrentDiagnosis] = React.useState<Diagnosis | null>(null);
  const [diagnosisHistory, setDiagnosisHistory] = React.useState<Diagnosis[]>([]);
  const [showChatbot, setShowChatbot] = React.useState(false);

  React.useEffect(() => {
    const savedHistory = localStorage.getItem('diagnosisHistory');
    if (savedHistory) {
      setDiagnosisHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSymptomSubmit = (symptoms: Symptom[]) => {
    const diagnosis = generateDiagnosis(symptoms);
    setCurrentDiagnosis(diagnosis);
    
    const updatedHistory = [diagnosis, ...diagnosisHistory].slice(0, 10);
    setDiagnosisHistory(updatedHistory);
    localStorage.setItem('diagnosisHistory', JSON.stringify(updatedHistory));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Stethoscope className="w-8 h-8 text-blue-500" />
              <span className="ml-2 text-xl font-semibold">AI Health Assistant</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowChatbot(!showChatbot)}
                className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
              >
                <MessageSquare className="w-6 h-6" />
              </button>
              <a
                href="/settings"
                className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
              >
                <SettingsIcon className="w-6 h-6" />
              </a>
              <button
                onClick={() => {
                  logout();
                  window.location.href = '/login';
                }}
                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {currentDiagnosis ? (
                <DiagnosisResult
                  diagnosis={currentDiagnosis}
                  onClose={() => setCurrentDiagnosis(null)}
                />
              ) : (
                <SymptomInput onSubmit={handleSymptomSubmit} />
              )}
              <DiagnosisHistory
                diagnoses={diagnosisHistory}
                onSelect={setCurrentDiagnosis}
              />
            </div>
          </div>
          
          {showChatbot && (
            <div className="lg:col-span-1">
              <Chatbot />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const user = getCurrentUser();
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <div className="min-h-screen bg-gray-100 py-12 px-4">
                <Settings />
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;