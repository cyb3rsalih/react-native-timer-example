import { DENEME_MESAJI,TOGGLE_VIBRATION } from './../actions/settings'

const initialState = {
    vibration:true,
    voice:true,
    tick:true,
    deneme:'ATATAT'
}

export default (state = initialState, {type,payload}) => {
    switch(type){
        case DENEME_MESAJI:{
            return{
                ...state,
                deneme: payload
            }
        }
        case TOGGLE_VIBRATION:{
            return{
                ...state,
                vibration: !state.vibration
            }
        }
        default: return state
    }
}