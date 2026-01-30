
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header, Footer } from './components/Layout';
import Landing from './pages/Landing';
import Survey from './pages/Survey';
import ThankYou from './pages/ThankYou';
import Gift from './pages/Gift';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-primary/30">
        <ScrollToTop />
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/gift" element={<Gift />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
