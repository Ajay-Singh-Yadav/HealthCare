import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

import auth from '@react-native-firebase/auth';

export const AuthProvider = ({ children }) => {
  const [initializing, setInitializing] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, []);

  const login = () => setIsAuthenticated(true);

  const logout = async () => {
    await auth().signOut();
    setIsAuthenticated(false);
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {!initializing && children}
    </AuthContext.Provider>
  );
};

// import { createContext, useEffect, useState } from 'react';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [initializing, setInitializing] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth().onAuthStateChanged(async user => {
//       if (user) {
//         setIsAuthenticated(true);

//         // 🔽 Get Firestore data
//         const doc = await firestore().collection('users').doc(user.uid).get();
//         if (doc.exists) {
//           setUserData({ uid: user.uid, ...doc.data() });
//         }
//       } else {
//         setIsAuthenticated(false);
//         setUserData(null);
//       }

//       if (initializing) setInitializing(false);
//     });

//     return unsubscribe;
//   }, []);

//   const login = userInfo => {
//     setIsAuthenticated(true);
//     setUserData(userInfo); // Accept object: { uid, name, email }
//   };

//   const logout = async () => {
//     await auth().signOut();
//     setIsAuthenticated(false);
//     setUserData(null);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, userData, login, logout }}>
//       {!initializing && children}
//     </AuthContext.Provider>
//   );
// };
