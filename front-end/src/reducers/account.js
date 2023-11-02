const accountReducer = (state = {}, action) =>{
    switch(action.type){
        case "LOGIN":{
            const account = action.payload; 
            return account;
        }

        case "LOGOUT": {
            return {}
        }

        default: 
            return state;
    }
}

export default accountReducer