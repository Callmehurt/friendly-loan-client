import './App.css';
import './styles/style.css';
import './styles/custom-css.css';
import 'react-toastify/dist/ReactToastify.css';

import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PersistLogin from './components/PersistLogin';
import LoginPage from './pages/auth/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import StudentLayout from './components/student/StudentLayout';
import StudentDashboard from './components/student/StudentDashboard';
import Group from './components/student/group/Group';
import SingleGroup from './components/student/group/SingleGroup';
import PageNotFound from './components/PageNotFound';
import LoanPage from './components/student/loan/Loan';
import SingleLoan from './components/student/loan/SingleLoan';
import Profile from './components/shared-components/Profile';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminGroup from './components/admin/pages/Group';
import AdminLoanPage from './components/admin/pages/Loan';
import LoanDetailPage from './components/admin/pages/LoanDetailPage';
import RegisterPage from './pages/auth/RegisterPage';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<Layout/>}>

          <Route path={'/user/register'} element={<RegisterPage/>}/>

          {/* Checks for authenticated user */}
          <Route element={<PersistLogin/>}>

            <Route path={'/user/login'} element={<LoginPage/>}/>

            {/* Protected routes for admin role */}
            <Route element={<ProtectedRoute allowedRole={'admin'}/>}>
              <Route element={<AdminLayout/>}>

                <Route exact path={'/admin/dashboard'} element={<AdminDashboard/>} />
                <Route exact path={'/admin/groups'} element={<AdminGroup/>} />
                <Route exact path={'/admin/group/:groupId'} element={<SingleGroup />} />

                <Route exact path={'/admin/loan/requests'} element={<AdminLoanPage />} />
                <Route exact path={'/admin/loan/manage/:reference'} element={<LoanDetailPage />} />

              </Route>
              <Route exact path={'/admin/my/profile'} element={<Profile />} />
            </Route>

            {/* Protected routes for student role */}
            <Route element={<ProtectedRoute allowedRole={'student'}/>}>
              <Route element={<StudentLayout/>}>
                <Route exact path={'/student/dashboard'} element={<StudentDashboard/>} />

                {/* groups page */}
                <Route exact path={'/student/groups'} element={<Group />} />
                <Route exact path={'/student/group/:groupId'} element={<SingleGroup />} />

                {/* loan page */}
                <Route exact path={'/student/my/loans'} element={<LoanPage />} />
                <Route exact path={'/student/loan/:reference'} element={<SingleLoan />} />

              </Route>
              
                {/* profile page */}
                <Route exact path={'/student/my/profile'} element={<Profile />} />
            </Route>


          </Route>

          <Route path={'*'} element={<PageNotFound/>} />
      </Route>
    </Routes>
  );
}

export default App;
