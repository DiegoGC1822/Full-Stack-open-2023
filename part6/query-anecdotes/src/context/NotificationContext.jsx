import { createContext, useContext, useReducer } from "react";

const NotificationReducer = (state, action) => {
    switch (action.type) {
        case "SET":
            return action.payload
        case "CLEAR":
            return null
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
    const [notification, notificationDispatch] = useReducer(NotificationReducer, null)

    return (
        <NotificationContext.Provider value={[ notification, notificationDispatch ]}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useDispatch = () => {
    const [, notificationDispatch] = useContext(NotificationContext)
    return (message, duration) => {
        notificationDispatch({ type: "SET", payload: message })
        setTimeout(() => {
            notificationDispatch({ type: "CLEAR" })
        }, duration * 1000)
    }
}

export const useNotification = () => {
    const [notification] = useContext(NotificationContext)
    return notification
}


export default NotificationContext