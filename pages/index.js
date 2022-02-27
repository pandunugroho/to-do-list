import { message, Spin } from 'antd'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchToDo, todoSelector } from './redux/features/todoSlice'

export default function Home() {
  const dispatch = useDispatch()
  const { data, errorMessage, isFetching } = useSelector(todoSelector)
  // const [initList, setInitList] = useState([])

  useEffect(() => {
    dispatch(fetchToDo())
  }, [])

  useEffect(() => {
    if (errorMessage) {
      message.error(errorMessage)
    }
  }, [errorMessage])

  return (
    <Spin spinning={isFetching}>
      <div style={{ minHeight: "100vh" }}>
        <Head>
          <title>To Do List App</title>
          <meta name="description" content="To Do List App" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h2>To Do List</h2>
        {data.filter(task => task.status === 0).map(todo => { return <pre key={todo.id}>{JSON.stringify(todo, undefined, 2)}</pre> })}
        {data.filter(task => task.status === 1).map(todo => { return <pre key={todo.id} style={{ textDecoration: "line-through" }}>{JSON.stringify(todo, undefined, 2)}</pre> })}
      </div>
    </Spin>
  )
}