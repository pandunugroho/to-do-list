import { Button, Form, Input, Modal } from "antd"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AddForm from "./AddForm"
import { closeModal, completeTask, deleteTask, todoSelector } from "./redux/features/todoSlice"

const DetailModal = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const { modalType, modalData } = useSelector(todoSelector)
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    form.setFieldsValue(modalData)
    setIsEdit(false)
  }, [modalType])

  const submitEdit = () => {
    const formBody = form.getFieldsValue()
    dispatch(completeTask({ ...modalData, ...formBody }))
    dispatch(closeModal())
  }
  const handleDelete = () => {
    dispatch(deleteTask(modalData))
    dispatch(closeModal())
  }
  const handleOnCancel = () => {
    dispatch(closeModal())
  }
  return (<Modal
    visible={modalType === "Detail" || modalType === "Add"}
    onCancel={handleOnCancel}
    footer={false}
    centered
  >
    {modalType === "Detail"
      ? isEdit
        ? <>
          <h2>Edit</h2>
          <br />
          <Form initialValues={modalData} form={form}>
            <Form.Item label="Title" name="title">
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea />
            </Form.Item>
          </Form>
        </>
        : <>
          <h2>{modalData.title}</h2>
          <span style={{ fontSize: 10, color: "grey" }}>{format(new Date(modalData.createdAt), "'Created at: 'MMM do, yyyy (p)")}</span>
          <br />
          <br />
          <p style={{ whiteSpace: "pre-line" }}>{modalData.description}</p>
        </>
      : modalType === "Add"
        ? <AddForm />
        : <></>
    }
    <div className="btn-wrapper">
      {isEdit && modalData.status === 0 && <Button danger type="primary" onClick={handleDelete}>Delete Task</Button>}
      {modalType === "Detail" && <Button onClick={() => setIsEdit(isEdit => !isEdit)}>{isEdit ? "Cancel" : "Edit"}</Button>}
      {isEdit && <Button type="primary" onClick={submitEdit}>Submit</Button>}
    </div>
  </Modal>
  )
}

export default DetailModal