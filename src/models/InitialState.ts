export interface User {
    uid: string | null,
    displayName: string | null,
    photoURL: string | null
}

export default interface InitialState {
    chatId: string,
    user: User | null
}