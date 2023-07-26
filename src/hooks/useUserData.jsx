import { useContext, useEffect, useState } from "react"
import { API_URL, TOKEN_KEY, doApiGet, doApiMethod } from "../services/apiService";
import { toast } from "react-toastify";
import { JobContext } from "../context/jobContext";
import { useNavigate } from "react-router-dom";


export const useUserData = () => {
  // const [userData,setUserData] = useState({});

  const { user, setUser, favs_ar, setFavsAr } = useContext(JobContext);
  const nav = useNavigate();
  console.log(user);
  useEffect(() => {
     if(user===null)
    {doApiUser();}


  }, [])

  const doApiUser = async () => {
    try {
      const url = API_URL + "/users/userInfo";
      const data = await doApiGet(url)
      console.log(data);
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    }
    catch (error) {
      console.log(error)
    }

  }


  // מנקה את הדאטא במיוחד כאשר המתשמש עושה
  // LOG OUT 
  // כך שלא יהיו שיבושים כאשר כבר נמחק הטוקן מהלוקאל
  const userSignOut = async () => {
    const url = API_URL + "/users/logout";
    const data = await doApiMethod(url, "POST");
    console.log(data);
    if (data.logout) {
      localStorage.removeItem(TOKEN_KEY);
      setUser({});
      nav("/");
      toast.info("You logged out, see you soon...");
    }
  }

  // const userSignOut = () => {
  //   setFavsAr([]);
  //   setUserData({})
  // }

  // מעדכן את המועדפים , גם בהחסרה וגם בהוספה
  // ואת המסד של המשתמש
  const updateFav = async (_newIdFav) => {
    const temp_ar = [...favs_ar];
    // בודק אם האיי די קיים במועדפים כבר או לא ופועל בהתאם
    if (!temp_ar.includes(_newIdFav)) {
      // מוסיף אותו למועדפים
      temp_ar.push(_newIdFav)
    }
    else {
      // מחסיר אותו מהמערך של המעודפים
      temp_ar.splice(temp_ar.indexOf(_newIdFav), 1)
    }
    setFavsAr(temp_ar)

    try {
      const url = API_URL + "/users/updateFav"
      const data = await doApiMethod(url, "PATCH", { favs_ar: temp_ar })
      if (data.modifiedCount) {
        toast.success("add/remove from favorite")
      }
    }
    catch (err) {
      console.log(err)
      alert("There problem, try again later")
    }
  }

  const unApplay = async (_jobId) => {
    try {
      const url = API_URL + "/contenders/?job_id=" + _jobId; // Change this URL to the appropriate endpoint for your apply form
      // console.log(formData);
      const data = await doApiMethod(url, "DELETE");
      console.log(data);
      // Handle success or failure as per your API response
      // For example, assuming the response contains a success message
      if (data.deletedCount) {
        console.log("unApplied successfully!");
        toast.success("you unapplied!");
        // nav("/"); // Navigate to the desired page after form submission
      }
    } catch (err) {
      console.log(err);
      alert("Error submitting the application!");
    }
  }

  // פונקציה שתעדכן את המועדפים גם בזכרון
  // וגם בשרת
  //  doApiUser -> נצטרך את הפונקציה כאשר משתמש
  // מתחבר 
  return { doApiUser, user, userSignOut, favs_ar, updateFav, unApplay };
  // return {favs_ar,userData,doApiUser,userSignOut,updateFav,user}
}