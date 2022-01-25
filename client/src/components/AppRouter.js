import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import User from '../pages/User';
import Auth from '../pages/Auth';

const AppRouter = () => {
    const [isAuth, setIsAuth] = useState(false)
    if( isAuth ) {
        return(
            <Routes>
                <Route path="/user" element={<User isAuth={setIsAuth} />} exact></Route>
                <Route path="*" element={<Navigate to="/user" />}></Route>
            </Routes>
        )
    } else {
        return(
            <Routes>
                <Route path="/" element={<Auth isAuth={setIsAuth} />}></Route>
                <Route path="*" element={<Navigate to="/" />}></Route>
            </Routes>
        )
    }

};

export default AppRouter;