const initialState ={
    popup: false,
    isLogin: false,
    isLoading: false,
    user: {},
    notes: [],
    creators: []
}
const reducer = (state=initialState, action) => {
    if(action.type === 'CHANGE_POPUP'){
        return{
            ...state,
            popup: action.value
        }
    }
    if(action.type === 'CHANGE_LOGIN'){
        return{
            ...state,
            isLogin: action.value
        }
    }
    if(action.type === 'CHANGE_USER'){
        return{
            ...state,
            user: action.value
        }
    }
    if(action.type === 'CHANGE_LOADING'){
        return{
            ...state,
            isLoading: action.value
        }
    }
    if(action.type === 'SET_NOTES'){
        return{
            ...state,
            notes: action.value
        }
    }
    if(action.type === 'SET_CREATORS'){
        return{
            ...state,
            creators: action.value
        }
    }
    return state;
}
export default reducer;