export default class UserStore {
    constructor(){
        this._auth = false
        this._data = {}
        this._name = ''
        this._data = {}
    }

    set (data) {
        this._auth = true
        this._data = data.user
        this._name = data.user.name + ' ' + data.user.surname
        this._tests = data.tests
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

    get tests() {
        return this._tests
    }
}