// import logo from './logo.svg';
import React from 'react';
import './App.css';
import AppRouters from './appRouters';
import { JobContext } from './context/jobContext';
import { ToastContainer } from 'react-toastify';
import { useUserData } from './hooks/useUserData';
import 'react-toastify/dist/ReactToastify.css';

// import './fonts.css';


function App() {
  const { favs_ar, userData, doApiUser, userSignOut, updateFav } = useUserData();

  return (
    <JobContext.Provider value={{
      favs_ar, userData,
      doApiUser, userSignOut,
      updateFav
    }}>
      <AppRouters />
      {/* קומפנינטה שתציג את ההודעות טוסט */}
      <ToastContainer theme="colored" />

    </JobContext.Provider>
  );
}

export default App;
