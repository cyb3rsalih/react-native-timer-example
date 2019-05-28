export const TOGGLE_VIBRATION = 'TOGGLE_VIBRATION'
export const TOGGLE_VOICE = 'TOGGLE_VOICE'
export const TOGGLE_TICK = 'TOGGLE_TICK'




export function toggleVibration(){
    return dispatch => {
        dispatch({ type: TOGGLE_VIBRATION, /* payload: something to pass reducer */ })
    }
}

// TODO: SES YÜKSEKLİĞİYLE DEĞİŞEBİLİR BURASI
export function toggleVoice(){
    return dispatch => {
        dispatch({ type: TOGGLE_VOICE, /* payload: something to pass reducer */ })
    }
}

export function toggleTick(){
    return dispatch => {
        dispatch({ type: TOGGLE_TICK, /* payload: something to pass reducer */ })
    }
}