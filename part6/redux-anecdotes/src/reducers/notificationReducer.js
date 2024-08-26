import { createSlice } from "@reduxjs/toolkit"

export const setNotification = (message, time) => {
    return dispatch => {
        dispatch(setMessage(message))
        setTimeout(() => {
            dispatch(clearNotification())
        }, time * 1000)
    }
}


const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setMessage(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return null
        }
    }
})

export const { setMessage, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer