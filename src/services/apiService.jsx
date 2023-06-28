import axios from "axios";

export const API_URL = "http://localhost:3001";

 export const TOKEN_KEY = "token"; 

export const doApiGet = async(_url) => {
  try {
    axios.defaults.withCredentials=true;
    const resp = await axios({
      url: _url,
      data:{}
    })
    return resp.data;
  }
  catch(err){
    // throw -> reject מקביל ל
    // ככה שנדע שיש בעיה עם הבקשה
    throw err;
  }
}

export const doApiMethod = async(_url,_method,_body = {}) => {
  try{
    axios.defaults.withCredentials=true;
    const resp = await axios({
      url:_url,
      method:_method,
      data:_body
    })
    return resp.data;
  }
  catch(err){
    throw err;
  }
}