import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { LOGIN_ROUTE, OTHER_ROUTE, MAIN_ROUTE, CREATE_TEST_ROUTE } from './utils/const';
import LoginPage from './components/pages/loginPage';
import MainPage from './components/pages/mainPage';
import CreateTestPage from './components/pages/createTestPage';

const AppRoutes = () => {

    return (
        <Routes>

            <Route
                path={OTHER_ROUTE}
                element={<Navigate to="/" replace />}
            />

            <Route
                path={MAIN_ROUTE}
                element={<MainPage />}
            />

            <Route
                path={LOGIN_ROUTE}
                element={<LoginPage />}
            />

            <Route
                path={CREATE_TEST_ROUTE}
                element={<CreateTestPage />}
            />

        </Routes>
    )
}

export default AppRoutes;
