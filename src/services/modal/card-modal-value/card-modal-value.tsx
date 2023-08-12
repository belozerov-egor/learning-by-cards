import { TextField } from '../../../components'
import { useAppDispatch, useAppSelector } from '../../store.ts'
import { modalActions } from '../modal.slice.ts'
import { selectSettings } from '../selectors.ts'

export const CardModalValue = () => {
  const { question, answer } = useAppSelector(selectSettings)
  const dispatch = useAppDispatch()
  const setQuestion = (value: string) => {
    dispatch(modalActions.setQuestion(value))
  }
  const setAnswer = (value: string) => {
    dispatch(modalActions.setAnswer(value))
  }

  return (
    <>
      <TextField
        type={'default'}
        value={question}
        label={'Name Pack'}
        placeholder={'name'}
        onChangeText={e => setQuestion(e)}
      />
      <TextField
        type={'default'}
        value={answer}
        label={'Name Pack'}
        placeholder={'name'}
        onChangeText={e => setAnswer(e)}
      />
    </>
  )
}
