import { ToastContainer, Slide } from 'react-toastify';
import './App.css';
import Form from './components/Form';
import FeedBackForm from './components/FeedBackForm';

function App() {
  return (
    <main>
      <ToastContainer transition={Slide} />
      <section className="section">
        <h1>React Optimized Form Demo</h1>
        <h2>Optimized Form (Baseline)</h2>
        <p>
          This form demonstrates render isolation. Each input manages its own
          state, and only the submit button reacts to submission state.
        </p>
        <Form />
        <h2>Form with Submission Feedback</h2>
        <p>
          This version adds toast notifications to observe the impact of global
          side effects on render count compared to the optimized baseline form.
        </p>
        <FeedBackForm />
        <p style={{ fontSize: '0.85rem', color: '#888' }}>
          Field is intentionally left without `required` attribute so you can
          experiment with custom validation.
        </p>
      </section>
    </main>
  );
}

export default App;
