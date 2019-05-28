import { TOGGLE_VIBRATION, TOGGLE_VOICE, TOGGLE_TICK } from './../actions/settings'

const initialState = {
    vibration:true,
    voice:true,
    tick:true,
}

export default (state = initialState, {type,payload}) => {
    switch(type){
        case TOGGLE_VIBRATION:{
            return{
                ...state,
                vibration: !state.vibration /* work with payload is possible */
            }
        }
        case TOGGLE_VOICE:{
            return{
                ...state,
                voice: !state.voice /* work with payload is possible */
            }
        }
        case TOGGLE_TICK:{
            return{
                ...state,
                tick: !state.tick /* work with payload is possible */
            }
        }
        default: return state
    }
}