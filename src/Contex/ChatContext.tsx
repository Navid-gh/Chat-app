import { createContext, useEffect, useState, useReducer, useContext } from 'react';
import ProtectedRoute from '../models/ProtectedRoute';
import InitialState from '../models/InitialState';
import { AuthContext } from './AuthContex';
import Action from '../models/ActionInterfaces';
import ChatValue from '../models/ChatContextValue';

export const ChatContext = createContext<ChatValue | null>(null);

export const ChatContextProvider = ({ children }: ProtectedRoute) => {

    const currentUser = useContext(AuthContext);

    const INITIAL_STATE: InitialState = {
        chatId: 'null',
        user: null
    }

    const chatReducer = (state: InitialState, action: Action) => {
        switch (action.type) {
            case 'CHANGE_USER':
                let combine: string = currentUser!.uid > action.payload.uid! ? currentUser!.uid + action.payload.uid! : action.payload.uid! + currentUser!.uid
                return (
                    {
                        user: action.payload,
                        chatId: combine
                    }
                )
            default :
                    return state
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)
    return (
        <ChatContext.Provider value={{data : state , dispatch}}>
            {children}
        </ChatContext.Provider>
    )
}

