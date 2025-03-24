
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <motion.div 
        className="card-game p-8 max-w-md w-full text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-7xl mb-6 mx-auto"
          animate={{ y: [0, -10, 0], rotate: [-5, 5, -5, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          😿
        </motion.div>
        
        <h1 className="text-4xl font-bold text-game-primary mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oh non ! Le chaton ne trouve pas cette page.</p>
        
        <motion.a 
          href="/" 
          className="btn-game btn-primary inline-flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Retourner à l'accueil
        </motion.a>
      </motion.div>
    </div>
  );
};

export default NotFound;
