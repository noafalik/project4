export const imgToString = async(_file) => {
    return new Promise((resolve,reject) => {
  
      const reader = new FileReader();
      reader.readAsDataURL(_file);
      
      reader.addEventListener("loadend", async() => {
        resolve(reader.result)
      })
    })
  }