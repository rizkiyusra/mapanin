import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Calculator from './pages/Calculator';
import GoalPlanner from './pages/GoalPlanner';
import Result from './pages/Result';
import NotFound from "./pages/NotFound.jsx";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Calculator />} />
                <Route path="/plan" element={<GoalPlanner />} />
                <Route path="/result" element={<Result />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Layout>
    );
}

export default App;