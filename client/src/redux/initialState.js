const savedUser = JSON.parse(localStorage.getItem('user'))

const initialState = {
    ads: [],
    user: savedUser || null
}
export default initialState