import { LOCAL_STORAGE_KEYS } from "@constants/localStorageKeys"
import { THEME_MODE } from "@models/core/theme"
import { useState } from "react"

const useDarkMode = ( ) => {
  const [isDarkMode, setIsDarkMode] = useState<string>(localStorage.getItem(LOCAL_STORAGE_KEYS.THEME_MODE) ?? THEME_MODE.LIGHT)

  const toggleDarkMode = () => {
    if (isDarkMode === THEME_MODE.DARK) {
      setIsDarkMode(THEME_MODE.LIGHT)
      document.body.classList.remove(THEME_MODE.DARK)
      localStorage.setItem(LOCAL_STORAGE_KEYS.THEME_MODE, THEME_MODE.LIGHT)
    }
    else {
      setIsDarkMode(THEME_MODE.DARK)
      document.body.classList.add(THEME_MODE.DARK)
      localStorage.setItem(LOCAL_STORAGE_KEYS.THEME_MODE, THEME_MODE.DARK)
    }
  }

  return {isDarkMode, toggleDarkMode}
}

export default useDarkMode
