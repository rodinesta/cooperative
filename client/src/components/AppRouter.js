import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {
    HOME_ROUTE,
    LOGIN_ROUTE,
    MEMBERS_ROUTE,
    REVIEWS_ROUTE,
    PROFILE_ROUTE,
    REVIEW_ROUTE
} from "../utils/consts";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import Profile from "../pages/Profile";
import Reviews from "../pages/Reviews";
import Members from "../pages/Members";
import ReviewPage from "../pages/ReviewPage";

const AppRouter = () => {

    return (
        <Routes>
            <Route path={HOME_ROUTE} element={<Home/>} />
            <Route path={PROFILE_ROUTE} element={<Profile/>} />
            <Route path={REVIEWS_ROUTE} element={<Reviews/>} />
            <Route path={REVIEW_ROUTE} element={<ReviewPage/>} />
            <Route path={MEMBERS_ROUTE} element={<Members/>} />
            <Route path={LOGIN_ROUTE} element={<Auth/>} />
        </Routes>
    );
};

export default AppRouter;