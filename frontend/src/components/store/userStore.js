export default class UserStore {
    constructor(){
        this._auth = false
        this._data = {}
        this._name = ''
    }

    set (data) {
        this._auth = true
        this._data = data.user
        this._name = data.user.name + ' ' + data.user.surname
    }

    get auth() {
        return this._auth
    }
    
    get data() {
        return this._data
    }

    get name() {
        return this._name
    }
    
}