import {makeAutoObservable} from "mobx";

export default class MemberStore {
    constructor() {
        this._isAuth = localStorage.getItem('token') ? true : false
        this._member = []
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setMember(member) {
        this._member = member
    }

    get isAuth() {
        return this._isAuth
    }
    get member() {
        return this._member
    }
}