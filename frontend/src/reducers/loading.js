import * as ActionTypes from '../actions/index'

const loading = (state = false, action) => {
    switch (action.type) {
        case ActionTypes.IS_LOADING:
            {
                console.log(action.loading);
                return action.loading
            }

        default:
            return state
    }
}
export default loading