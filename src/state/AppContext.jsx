import { createContext, useContext, useEffect, useReducer } from 'react'

const STORAGE_KEY = 'zap-watch:v1'

const defaultState = {
  isPro: false,
  sessions: [],
  profile: {
    proficiency: 62,
    baseline: 54,
    streak: 3,
  },
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    const parsed = JSON.parse(raw)
    return { ...defaultState, ...parsed, profile: { ...defaultState.profile, ...(parsed.profile || {}) } }
  } catch {
    return defaultState
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PRO':
      return { ...state, isPro: true }
    case 'ADD_SESSION': {
      const next = [...state.sessions, action.session].slice(-20)
      const recentAvg = next.slice(-5).reduce((s, x) => s + x.score, 0) / Math.max(1, next.slice(-5).length)
      const proficiency = Math.round(recentAvg || state.profile.proficiency)
      return {
        ...state,
        sessions: next,
        profile: { ...state.profile, proficiency },
      }
    }
    case 'RESET':
      return defaultState
    default:
      return state
  }
}

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // storage quota or private mode — ignore
    }
  }, [state])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
