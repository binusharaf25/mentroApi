


const globalError=(error)=>{
    if(!error) return null;
    if(error.response?.data){
        const data =error.response.data
        //Handle Zod Validation error (array format)
        if(data.errors && Array.isArray(data.errors)){
            return data.errors.map(err=>err.message).join(',')
        }

        //handle single error message
        if(data.message){
            return data.message
        }

        //handle error field
        if(data.error){
            return data.error
        }
        if(error.response && !error.response)
            return 'Network error ,please check your connection'
    }

    //general error 
    if(error.message){
        return error.message
    }

    return 'something went wrong , please try again'
}

export default globalError