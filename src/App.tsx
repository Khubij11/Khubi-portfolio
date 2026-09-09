import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Nav from './components/Nav';
import Home from './pages/Home';
import About from './pages/About';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import Cars24ReferEarn from './case-studies/Cars24ReferEarn';
import Cars24Challans from './case-studies/Cars24Challans';
import Klub from './case-studies/Klub';
import Spottabl from './case-studies/Spottabl';
import WellsFargoFinancialHealth from './case-studies/WellsFargoFinancialHealth';
import WellsFargoAITool from './case-studies/WellsFargoAITool';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div style={{ background: 'var(--paper)', color: 'var(--ink)', minHeight: '100vh' }}>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/work/cars24-refer-earn" element={<Cars24ReferEarn />} />
          <Route path="/work/cars24-challans" element={<Cars24Challans />} />
          <Route path="/work/klub" element={<Klub />} />
          <Route path="/work/spottabl" element={<Spottabl />} />
          <Route path="/work/wells-fargo-financial-health" element={<WellsFargoFinancialHealth />} />
          <Route path="/work/wells-fargo-ai-tool" element={<WellsFargoAITool />} />
        </Routes>
      </div>
      <Analytics />
    </BrowserRouter>
  );
}
