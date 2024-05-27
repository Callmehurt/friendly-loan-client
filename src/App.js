import './App.css';
import './styles/style.css';
import 'react-toastify/dist/ReactToastify.css';

import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PersistLogin from './components/PersistLogin';
import LoginPage from './pages/auth/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import StudentLayout from './components/student/StudentLayout';
import StudentDashboard from './components/student/StudentDashboard';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<Layout/>}>

          {/* Checks for authenticated user */}
          <Route element={<PersistLogin/>}>

            <Route path={'/user/login'} element={<LoginPage/>}/>

            {/* Protected routes for admin role */}
            <Route element={<ProtectedRoute allowedRole={'admin'}/>}>
              <Route element={<AdminLayout/>}>

              </Route>
            </Route>

            {/* Protected routes for student role */}
            <Route element={<ProtectedRoute allowedRole={'student'}/>}>
              <Route element={<StudentLayout/>}>
                <Route exact path={'/student/dashboard'} element={<StudentDashboard/>} />
              </Route>
            </Route>


          </Route>
      </Route>
    </Routes>
  );
}

export default App;