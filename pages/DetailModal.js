import { Button, Modal } from "antd"
import { format } from "date-fns"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setModal, todoSelector } from "./redux/features/todoSlice"

export const DetailModal = () => {
  const dispatch = useDispatch()
  const { modalType, modalData } = useSelector(todoSelector)
  const [isEdit, setIsEdit] = useState(false)
  return (<Modal
    visible={modalType === "Detail"}
    onCancel={() => dispatch(setModal({ type: "", modalData: {} }))}
    footer={false}
    centered
  >
    <h2>{modalData.title}</h2>
    <span style={{ fontSize: 10, color: "grey" }}>{format(modalData.createdAt, "'Created at: 'MMM do, yyyy (p)")}</span>
    <br />
    <br />
    <p>{modalData.description}</p>
    <div className="btn-wrapper">
      <Button onClick={() => setIsEdit(isEdit => !isEdit)}>{isEdit ? "Edit" : "Cancel"}</Button>
    </div>
  </Modal>
  )
}