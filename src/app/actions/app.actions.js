import { SHOW_LOADING, HIDE_LOADING, TO_BUSY_STATE, TO_NORMAL_STATE} from '../constants/app.constants'
export const toggleLoading = (state) => {
    return { type: (state ? SHOW_LOADING : HIDE_LOADING) }
}

export const toggleBusy = (busy) => {
    return { type: (busy ? TO_BUSY_STATE : TO_NORMAL_STATE) }
}
