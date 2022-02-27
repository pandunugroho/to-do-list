import { message } from 'antd'
import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Home() {
  const [initList, setInitList] = useState([])
  useEffect(() => {
    fetch('https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list')
      .then(response => {
        response.json().then(data => {
          setInitList(data)
        },
          err => message.error("Failed to fetch initial list"))
      })
  }, [])
  return (
    <div>
      <Head>
        <title>To Do List App</title>
        <meta name="description" content="To Do List App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2>To Do List</h2>
      <pre>{JSON.stringify(initList, undefined, 4)}</pre>
    </div>
  )
}