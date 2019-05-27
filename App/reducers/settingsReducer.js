import { DENEME_MESAJI } from './../actions/settings'

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
        default: return state
    }
}