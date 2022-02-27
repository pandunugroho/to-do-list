import { Button, message, Spin } from 'antd'
import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DetailModal } from './DetailModal'
import { completeTask, fetchToDo, setModal, todoSelector } from './redux/features/todoSlice'

export default function Home() {
  const dispatch = useDispatch()
  const { data, errorMessage, isFetching, modalData } = useSelector(todoSelector)

  useEffect(() => {
    dispatch(fetchToDo())
  }, [])

  useEffect(() => {
    if (errorMessage) message.error(errorMessage)
  }, [errorMessage])

  const ascFunc = (a, b) => a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0
  const descFunc = (a, b) => a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0

  return (
    <Spin spinning={isFetching}>
      <div style={{ minHeight: "100vh", padding: 24 }}>
        <Head>
          <title>To Do List App</title>
          <meta name="description" content="To Do List App" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <DetailModal />

        <h1>To Do List</h1>
        <div className='btn-add-task' onClick={() => dispatch(setModal({ type: "Add", modalData: {} }))}>+</div>

        {data.filter(task => task.status === 0).sort(ascFunc).map(todo => <>
          <div className='to-do-list' key={todo.id}>
            <h2>{todo.title}</h2>
            <div>
              <Button type='link' onClick={() => dispatch(setModal({ type: "Detail", modalData: todo }))}>Detail</Button>
              <Button type='link' onClick={() => dispatch(completeTask({ ...todo, status: 1 }))}>✔</Button>
            </div>
          </div>
        </>)}
        {data.filter(task => task.status === 1).sort(descFunc).map(todo => <>
          <div className='to-do-list list-done' key={todo.id}>
            <h2>{todo.title}</h2>
            <div>
              <Button type='link' onClick={() => dispatch(setModal({ type: "Detail", modalData: todo }))}>Detail</Button>
              <Button type='link' onClick={() => dispatch(completeTask({ ...todo, status: 0 }))}>❌</Button>
            </div>
          </div>
        </>
        )}
      </div>
    </Spin>
  )
}
