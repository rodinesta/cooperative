import {makeAutoObservable} from "mobx";

export default class ReviewStore {
    constructor() {
        this._review = []
        makeAutoObservable(this)
    }

    setReview(review) {
        this._review = review
    }

    get review() {
        return this._review
    }
}