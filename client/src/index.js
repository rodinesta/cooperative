import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import MemberStore from "./store/MemberStore";
import ReviewStore from "./store/ReviewStore";

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        member: new MemberStore(),
        review: new ReviewStore()

    }}>
        <App />
    </Context.Provider>
);
