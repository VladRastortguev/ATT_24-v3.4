export interface HeaderInterface {
    InterfaceObj: {
        pageName: string
    },
    FunctionObj?: {
        changeShowBlock: ((newState: boolean) => void) | null
        showSettingBlock: boolean
    }
}