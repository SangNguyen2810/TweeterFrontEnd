export const IS_LOADING = 'IS_LOADING'

export function isLoading(loading){
    return {
        type: IS_LOADING,
        loading
    }
}

