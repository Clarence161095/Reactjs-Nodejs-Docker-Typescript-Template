import { useState } from 'react'

// This is a sample for a custom hook.
function useInputText(defaultValue: any) {
  const [value, setValue] = useState(defaultValue)

  function onChange(e: any) {
    setValue(e.target.value)
  }

  return { value, onChange }
}

export default useInputText
