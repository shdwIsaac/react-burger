import { useState } from 'react'

export function useForm (inputValues: any): any {
  const [values, setValues] = useState(inputValues)

  const handleChange = (event: { target: HTMLInputElement }): void => {
    const { value, name } = event.target
    setValues({ ...values, [name]: value })
  }
  return { values, handleChange, setValues }
}
