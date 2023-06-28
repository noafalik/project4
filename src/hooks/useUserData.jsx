import { useEffect, useState } from "react"
import { API_URL, TOKEN_KEY, doApiGet, doApiMethod } from "../services/apiService";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export const useUserData = () => {
  const [favs_ar,setFavsAr] = useState([]);
  const [userData,setUserData] = useState({});

  useEffect(() => {
    if(Cookies.get[TOKEN_KEY]){
      doApiUser();
    }
  },[])

  const doApiUser = async() => {
    const url = API_URL+"/users/userInfo";
    const data = await doApiGet(url)
    console.log(data);
    setFavsAr(data.favs_ar);
    setUserData(data);
  }

  // מנקה את הדאטא במיוחד כאשר המתשמש עושה
  // LOG OUT 
  // כך שלא יהיו שיבושים כאשר כבר נמחק הטוקן מהלוקאל
  const userSignOut = () => {
    setFavsAr([]);
    setUserData({})
  }

  // מעדכן את המועדפים , גם בהחסרה וגם בהוספה
  // ואת המסד של המשתמש
  const updateFav = async(_newIdFav) => {
    const temp_ar = [...favs_ar];
    // בודק אם האיי די קיים במועדפים כבר או לא ופועל בהתאם
    if(!temp_ar.includes(_newIdFav)){
      // מוסיף אותו למועדפים
      temp_ar.push(_newIdFav)
    }
    else{
      // מחסיר אותו מהמערך של המעודפים
      temp_ar.splice(temp_ar.indexOf(_newIdFav),1)
    }
    setFavsAr(temp_ar)

    try{
      const url = API_URL + "/users/updateFav"
      const data = await doApiMethod(url,"PATCH",{favs_ar:temp_ar})
      if(data.modifiedCount){
        toast.success("add/remove from favorite")
      }
    }
    catch(err){
      console.log(err)
      alert("There problem, try again later")
    }
  }

  // פונקציה שתעדכן את המועדפים גם בזכרון
  // וגם בשרת
//  doApiUser -> נצטרך את הפונקציה כאשר משתמש
// מתחבר 
  return {favs_ar,userData,doApiUser,userSignOut,updateFav}
}