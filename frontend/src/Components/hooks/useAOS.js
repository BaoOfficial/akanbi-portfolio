import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Custom hook for AOS initialization
export const useAOS = (config = {}) => {
  useEffect(() => {
    // Default configuration
    const defaultConfig = {
      once: true,
      mirror: false,
    };
    
    // Merge default config with any custom config passed
    AOS.init({
      ...defaultConfig,
      ...config
    });
    
    // Refresh AOS on window resize for better responsiveness
    window.addEventListener('resize', () => {
      AOS.refresh();
    });
    
    // Clean up event listener
    return () => {
      window.removeEventListener('resize', () => {
        AOS.refresh();
      });
    };
  }, [config]); // Re-run if config changes
};

export default useAOS;