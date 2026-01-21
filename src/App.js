
import { useState } from 'react';
import './App.css';
import AnimatedBackground from './components/AnimatedBackground';
import PageLoader from './components/PageLoader';

function App() {
    const [loaded, setLoaded] = useState(false);
  return (
    <div className="App">
     {!loaded && <PageLoader onComplete={() => setLoaded(true)} />}
      <AnimatedBackground />
     </div>
  );
}

export default App;
