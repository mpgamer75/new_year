// app/page.js
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [message] = useState("Ton message secret pour Lisa ici");
  const [isNewYear, setIsNewYear] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const checkDate = () => {
      // Obtenir l'heure actuelle à Charlotte, NC (Eastern Time)
      const now = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
      const charlotteTime = new Date(now);
      const newYear = new Date('2025-01-01T00:00:00-05:00'); // -05:00 pour Eastern Time
      setIsNewYear(charlotteTime >= newYear);
    };
    
    checkDate();
    const interval = setInterval(checkDate, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOpen = () => {
    if (!isNewYear) {
      setError('Il faut attendre minuit à Charlotte (USA) le 1er janvier 2025! 🎉');
      setClickCount(prev => prev + 1);
      
      // Solution de secours après 5 clics
      if (clickCount >= 4) {
        setIsOpen(true);
        setError('');
        return;
      }
      return;
    }
    setIsOpen(true);
    setError('');
  };

  // Bouton de secours caché (double-clic sur le texte d'erreur)
  const handleErrorClick = () => {
    if (!isOpen && error) {
      setIsOpen(true);
      setError('');
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">
          Pour Lisa 🌟
        </h1>
        
        {!isOpen ? (
          <div className="flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleOpen}
              className="bg-white px-6 py-3 rounded-full text-purple-500 font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Abrir
            </motion.button>
            
            {error && (
              <p 
                className="mt-4 text-white bg-red-500 p-2 rounded cursor-pointer"
                onClick={handleErrorClick}
                onDoubleClick={() => setIsOpen(true)}
              >
                {error}
              </p>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-white p-8 rounded-lg shadow-xl max-w-md"
          >
            <h2 className="text-2xl font-bold text-purple-500 mb-4">
              ¡Happy New Year! 🎊
            </h2>
            <p className="text-gray-700">{message}</p>
          </motion.div>
        )}
      </div>
    </main>
  );
}