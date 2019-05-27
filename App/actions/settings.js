export const DENEME_MESAJI = 'DENEME_MESAJI'

export function changeDenemeMesaji(yeniYazi){
    return dispatch => {
        dispatch({
            type: DENEME_MESAJI,
            payload: yeniYazi.toString()
        })
    }
}