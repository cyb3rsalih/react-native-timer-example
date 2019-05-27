export const DENEME_MESAJI = 'DENEME_MESAJI'
export const TOGGLE_VIBRATION = 'TOGGLE_VIBRATION'
export const TOGGLE_VOICE = 'TOGGLE_VOICE'
export const TOGGLE_TICK = 'TOGGLE_TICK'



export function changeDenemeMesaji(yeniYazi){
    return dispatch => {
        dispatch({
            type: DENEME_MESAJI,
            payload: yeniYazi.toString()
        })
    }
}

export function toggleVibration(){
    return dispatch => {
        dispatch({
            type: TOGGLE_VIBRATION
        })
    }
}
