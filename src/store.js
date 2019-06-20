import Vue from "vue";
import Vuex from "vuex";

import {
    WHITE,
    BLACK,
    PLACE
} from './lib/constants'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        colorToMove: 'W',
        whitePiecesRemaining: 9,
        blackPiecesRemaining: 9,
        piecesPlaced: 0,
        phase: PLACE,
        board: Array(24).fill(null).map(() => ({
            color: null,
            highlighted: false
        }))
    },
    mutations: {
        setPhase (state, phase) {
            state.phase = phase
        },
        toggleMove (state) {
            state.colorToMove = state.colorToMove === WHITE ? BLACK : WHITE
        },
        setBoard (state, board) {
            state.board = board
        },
        playPiece (state) {
            state.piecesPlaced++
        },
        removeWhitePiece (state) {
            state.whitePiecesRemaining--
        },
        removeBlackPiece (state) {
            state.blackPiecesRemaining--
        }
    },
    actions: {
        setPhase ({ commit }, phase) {
            commit('setPhase', phase)
        },
        addPiece ({ commit, state }, location) {
            const newBoard = [...state.board]
            newBoard[location] = {
                color: state.colorToMove,
                highlighted: false
            }

            if (state.colorToMove === BLACK) {
                commit('playPiece')
            }

            commit('setBoard', newBoard)
            commit('toggleMove')
        },
        highlightPiece ({ commit, state }, location) {
            const newBoard = [...state.board]
            newBoard[location] = {
                color: newBoard[location].color,
                highlighted: true
            }

            commit('setBoard', newBoard)
        },
        unhighlightAllPieces ({ commit, state }) {
            const newBoard = state.board.map(x => ({
                color: x.color,
                highlighted: false
            }))

            commit('setBoard', newBoard)
        },
        removePiece ({ commit, state }, { location, destroy }) {
            const newBoard = [...state.board]
            newBoard[location] = { color: null, highlighted: false }

            if (destroy) {
                if (state.board[location].color === WHITE) {
                    commit('removeWhitePiece')
                } else {
                    commit('removeBlackPiece')
                }
            }

            commit('setBoard', newBoard)
        },
    }
});
