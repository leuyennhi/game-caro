import { combineReducers } from 'redux'
import game from './game.reducer'
import registration from './registration.reducer'
import user from './user.reducer'
// import user from './user.reducer'

export default combineReducers({
    game,
    registration,
    user
})