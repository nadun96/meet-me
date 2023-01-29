import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function AuthProvider() {
  return (
    <AuthContext.Provider>
      {!loadingInitial && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext);
}
 
const styles = StyleSheet.create({})