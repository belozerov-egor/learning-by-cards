import { modalActions, selectSettings, useAppDispatch, useAppSelector } from '../../../services'
import { TextField } from '../../ui'

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
        label={'Question'}
        placeholder={'Question'}
        onChangeText={e => setQuestion(e)}
      />
      <TextField
        type={'default'}
        value={answer}
        label={'Answer'}
        placeholder={'Answer'}
        onChangeText={e => setAnswer(e)}
      />
    </>
  )
}
