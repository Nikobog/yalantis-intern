import {makeAutoObservable} from "mobx";

export default class User {
    constructor() {
        this._user = {}
        this._isAuth = {}
        makeAutoObservable(this)
    }

    setUser(user) {
        this._user = user
    }
    
    setIsAuth(user) {
        this._user = user
    }

    get user() {
        return this._user
    }

    get isAuth() {
        return this._user
    }
}