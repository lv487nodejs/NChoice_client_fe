const setSnackbarStatus = (data) => ({
    type: 'SET_SNACKBAR_STATUS',
    payload: data,
})
const setSnackbarText = (data) => ({
    type: 'SET_SNACKBAR_TEXT',
    payload: data,
})
const setSnackbarDuration = (data) => ({
    type: 'SET_SNACKBAR_DURATION',
    payload: data,
})
const setSnackbarSeverity = (data) => ({
    type: 'SET_SNACKBAR_SEVERITY',
    payload:data
})
export {
 setSnackbarDuration,
  setSnackbarStatus,
  setSnackbarText,
  setSnackbarSeverity
}