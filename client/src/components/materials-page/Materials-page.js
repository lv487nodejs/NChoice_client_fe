import React, { useEffect } from 'react';
import StaticMaterialsContent from './static-materials-content';
import './Materials-page.css';

const MaterialsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <StaticMaterialsContent />;
};

export default MaterialsPage;
