import firebase, { database } from '../../firebase';

export const actionUserName = () => (dispatch) => {
    setTimeout(() => {
        return dispatch({ type: 'CHANGE_USER', value: 'nusatara' })
    }, 2000)
}

export const registerUserAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: 'CHANGE_LOADING', value: true })
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then(res => {
                console.log('success: ', res);
                dispatch({ type: 'CHANGE_LOADING', value: false })
                resolve(true)
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage)
                dispatch({ type: 'CHANGE_LOADING', value: false })
                reject(false)
            })
    })

}

export const loginUserAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: 'CHANGE_LOADING', value: true })
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then(res => {
                // console.log('success: ', res);
                const dataUser = {
                    email: res.user.email,
                    uid: res.user.uid,
                    emailVerified: res.user.emailVerified,
                    refreshToken: res.user.refreshToken
                }
                dispatch({ type: 'CHANGE_LOADING', value: false })
                dispatch({ type: 'CHANGE_LOGIN', value: true })
                dispatch({ type: 'CHANGE_USER', value: dataUser })
                resolve(dataUser)
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage)
                dispatch({ type: 'CHANGE_LOADING', value: false })
                dispatch({ type: 'CHANGE_LOGIN', value: false })
                reject(false)
            })
    })
}

//Data Notes
export const addDataToAPI = (data) => (dispatch) => {
    database.ref('notes/' + data.userId).push({
        title: data.title,
        content: data.content,
        date: data.date
    })
}
export const getDataFromAPI = (userId) => (dispatch) => {
    const userNotes = database.ref('notes/' + userId);
    return new Promise((resolve, reject)=>{
        userNotes.on('value', function (snapshot) {
            console.log('get Data', snapshot.val());

            const data = [];
            if (snapshot.val() === null ) { 
                
            } else {
                
                Object.keys(snapshot.val()).map(key => {
                    data.push({
                        id: key,
                        data: snapshot.val()[key]
                        })
                    });
            }
            dispatch({type: 'SET_NOTES', value: data})
            resolve(snapshot.val())
        });
    })
}
export const updateDataAPI = (data) => (dispatch) => {
    const userNotes = database.ref(`notes/${data.userId}/${data.noteId}`);
    return new Promise((resolve, reject)=>{
        userNotes.set({
            title: data.title,
            content: data.content,
            date: data.date
        }, (err) => {
            if(err){
                reject(false);
            }else{
                resolve(true);
            }
        });
    })
}
export const deleteDataAPI = (data) => (dispatch) => {
    const userNotes = database.ref(`notes/${data.userId}/${data.noteId}`);
    return new Promise((resolve, reject)=>{
        userNotes.remove();
    })
}

//Data Creators
export const addDataToCreator = (data) => (dispatch) => {
    database.ref('creators/' + data.userId).push({
        name: data.name,
        desc: data.desc,
        date: data.date,
        profileImg: data.profileImg
    })
}
export const getDataFromCreator = (userId) => (dispatch) => {
    const userCreators = database.ref('creators/' + userId);
    return new Promise((resolve, reject)=>{
        userCreators.on('value', function (snapshot) {
            console.log('get Data', snapshot.val());

            const data = [];
            if (snapshot.val() === null ) { 
                
            } else {
                
                Object.keys(snapshot.val()).map(key => {
                    data.push({
                        id: key,
                        data: snapshot.val()[key]
                        })
                    });
            }
            dispatch({type: 'SET_CREATORS', value: data})
            resolve(snapshot.val())
        });
    })
}
export const updateDataCreator = (data) => (dispatch) => {
    const userCreators = database.ref(`creators/${data.userId}/${data.creatorId}`);
    return new Promise((resolve, reject)=>{
        userCreators.set({
            name: data.name,
            desc: data.desc,
            date: data.date,
            profileImg: data.profileImg
        }, (err) => {
            if(err){
                reject(false);
            }else{
                resolve(true);
            }
        });
    })
}
export const deleteDataCreator = (data) => (dispatch) => {
    const userCreators = database.ref(`creators/${data.userId}/${data.creatorId}`);
    return new Promise((resolve, reject)=>{
        userCreators.remove();
    })
}