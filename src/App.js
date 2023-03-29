import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { history } from './utils/history'
import AdminTemplate from './pages/UI/UI_Admin/Ui_Admin'

import Home from './pages/User/Home';
import EditFilm from './pages/Admin/Film/EditFilm';
import AddNewUser from './pages/Admin/Film/AddNewUser';
import ProfileUsers from './pages/User/ProfileUsers';
import Detail from './pages/User/DetailBooking';
import Showtime from './pages/Admin/Film/Showtime';
import AddNewFilm from './pages/Admin/Film/AddNewFilm';
import Users from './pages/Admin/Film/Users'
import NotFound from './pages/NotFound';
import Login from './pages/User/Login';
import Register from './pages/User/Register';
import AllFooterHeader from '../src/pages/UI/UI_User/AllFooterHeader';
import BookingTicket from './pages/User/BookingTicket';
import Dashboard from './pages/Admin/Dashboard';
import Film from './pages/Admin/Film/Film';
import EditUser from './pages/Admin/Film/EditUser';

function App() {
    return (
        <HistoryRouter history={history}>
            <Routes>
                <Route path='/' element={<AllFooterHeader />}>
                    <Route index path='/' element={<Home />} />
                    <Route path='*' element={<NotFound />} />
                    <Route path='notfound' element={<NotFound />} />
                    <Route path='detail/:id' element={<Detail />} />
                    <Route path='inforUser' element={<ProfileUsers />} />
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                    <Route path='booking/:id' element={<BookingTicket />} />
                </Route>
                <Route path='/admin' element={<AdminTemplate />}>
                    <Route path='/admin' index element={<Dashboard />} />
                    <Route path='user' element={<Users />} />
                    <Route path='user/addnewuser' element={<AddNewUser />} />
                    <Route path='user/edit/:taiKhoan' element={<EditUser />} />
                    <Route path='film' element={<Film />} />
                    <Route path='film/edit/:id' element={<EditFilm />}/>
                    <Route path='film/showtime/:id/:tenPhim' element={<Showtime />}/>
                    <Route path='film/addnewfilm' element={<AddNewFilm />}/>
                    <Route path='showtime' element={<Showtime />}/>
                </Route>
            </Routes>
        </HistoryRouter>
    );
}
export default App;
