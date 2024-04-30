import { I_ActionTable, E_ActionKeyTable, I_TableState } from "@/types/Table.d";


export const initialState: I_TableState = {
    rowSelected: {},
    hasSelected: false,
    handleModal: false,
    modalDelete: false,
    message: {},
    dataTable: {},
    searching: false,
    searchResult: [],
    paginationTable: {
        totalItems: null,
        totalPages: null,
        currentPage: null,
        totalData: null,
        page: 1,
        size: 10,
    }
}

export const TableReducer = (state = initialState, action: I_ActionTable) => {
    switch (action.type) {
        case E_ActionKeyTable.SET_SELECTED_ROW: {
            return {
                ...state,
                rowSelected: action.payload
            }
        }
        case E_ActionKeyTable.SET_HAS_SELECTED: {
            return {
                ...state,
                hasSelected: action.payload
            }
        }
        case E_ActionKeyTable.CLEAR_SELECTED: {
            return {
                ...state,
                rowSelected: {},
                hasSelected: false,
            }
        }
        case E_ActionKeyTable.SET_HANDLE_MODAL: {
            return {
                ...state,
                handleModal: action.payload
            }
        }
        case E_ActionKeyTable.SET_MODAL_DELETE: {
            return {
                ...state,
                modalDelete: action.payload
            }
        }
        case E_ActionKeyTable.SET_MESSAGE: {
            return {
                ...state,
                message: {
                    value: action.payload.value,
                    status: action.payload.status,
                    visible: true,
                    scrollIntoView: true
                }
            }
        }
        case E_ActionKeyTable.SET_MESSAGE_SCROLL: {
            return {
                ...state,
                message: {
                    ...state.message,
                    scrollIntoView: action.payload
                }
            }
        }
        case E_ActionKeyTable.CLEAR_MESSAGE: {
            return {
                ...state,
                message: {}
            }
        }
        case E_ActionKeyTable.SET_DATA_TABLE: {
            return {
                ...state,
                dataTable: action.payload
            }
        }
        case E_ActionKeyTable.SET_SEARCHING: {
            return {
                ...state,
                searching: action.payload
            }
        }
        case E_ActionKeyTable.SET_SEARCH_RESULT: {
            return {
                ...state,
                searchResult: action.payload
            }
        }
        case E_ActionKeyTable.RESET_SERACH: {
            return {
                ...state,
                searching: false,
                searchResult: []
            }
        }

        case E_ActionKeyTable.SET_PAGINATION: {
            return {
                ...state,
                paginationTable: action.payload
            }
        }

        case E_ActionKeyTable.RESET_PAGINATION: {
            return {
                ...state,
                paginationTable: initialState.paginationTable
            }
        }

        default:
            return state
    }
}