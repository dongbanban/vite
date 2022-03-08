/*
 * @file: Card Reducer
 * @author: dongyang(yang.dong@Mysoft.net)
 */
import { useReducer } from 'react';
const initialState = { visible: false, lineHeight: 'default' };

function reducer(state, action) {
    switch (action.type) {
        case 'changeVisible':
            return { ...state, visible: action.visible };
        case 'changeHeight':
            return { ...state, lineHeight: action.lineHeight };
        default:
            throw new Error();
    }
}

function useCardReducer() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return { state, dispatch }
}

export default useCardReducer