import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react';
// utils
import axiosInstance from '../utils/axios';
import localStorageAvailable from '../utils/localStorageAvailable';
//
import { isValidToken, setSession } from './utils';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }

  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext(null);

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        const userData =JSON.parse(localStorage.getItem('users'))
        console.table("userData",userData)
        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: true,
            user: userData,
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    const response = await axiosInstance.post('/login', {
      email,
      password,
    });
    const { accessToken, user, error_code, data } = response.data;
    console.log(error_code)
    if (error_code) {
      // setSession(null);
      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    } else {
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('cons_id', data.consid)
      localStorage.setItem('users', JSON.stringify(user))
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
        },
      });
    }
  }, []);

  // REGISTER
  const register = useCallback(async (email, password, firstName, lastName) => {
    const response = await axiosInstance.post('/register', {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user, error_code } = response.data;
    console.log(error_code)
    if (error_code) {
      // setSession(null);
      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    } else {
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('cons_id', user.consid)
      localStorage.setItem('users', JSON.stringify(user))
      dispatch({
        type: 'REGISTER',
        payload: {
          user,
        },
      });
    }
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null);
    window.localStorage.clear()
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: 'jwt',
      login,
      register,
      logout,
    }),
    [state.isAuthenticated, state.isInitialized, state.user, login, logout, register]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
