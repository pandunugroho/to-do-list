import { Button, Form, Input } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { addTask, closeModal, todoSelector } from "./redux/features/todoSlice"

export const AddForm = () => {
  const [form] = Form.useForm()
  const { data } = useSelector(todoSelector)
  const dispatch = useDispatch()

  const handleFinishAdd = () => {
    const formBody = form.getFieldsValue()
    formBody.createdAt = new Date().toISOString()
    formBody.id = data[data.length - 1].id + 1
    formBody.status = 0
    dispatch(addTask({ data: [...data, formBody] }))
    dispatch(closeModal())
  }
  return <>
    <h2>Add</h2>
    <br />
    <Form form={form} onFinish={handleFinishAdd}>
      <Form.Item label="Title" name="title">
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item >
        <div className="btn-wrapper">
          <Button type="primary" htmlType="submit">Add</Button>
        </div>
      </Form.Item>

    </Form>
  </>
}