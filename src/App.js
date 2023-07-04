// import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import AppRouters from './appRouters';
import { JobContext } from './context/jobContext';
import { ToastContainer } from 'react-toastify';
import { useUserData } from './hooks/useUserData';
import 'react-toastify/dist/ReactToastify.css';
import { TOKEN_KEY } from './services/apiService';

// import './fonts.css';


function App() {
  // const { favs_ar, userData, doApiUser, userSignOut, updateFav } = useUserData();
  const [user,setUser]= useState(JSON.parse(localStorage.getItem(TOKEN_KEY)) || null);
  const [favs_ar,setFavsAr] = useState([]);

  useEffect(()=>{
      if(user){
        setFavsAr(user.favs_ar);
      }
  },[user])

  return (
    <JobContext.Provider value={{
      // favs_ar, userData,
      // doApiUser, userSignOut,
      user,setUser,
      favs_ar,setFavsAr
      // updateFav
    }}>
      <AppRouters />
      {/* קומפנינטה שתציג את ההודעות טוסט */}
      <ToastContainer theme="colored" />

    </JobContext.Provider>
  );
}

export default App;