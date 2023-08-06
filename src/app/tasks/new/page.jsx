'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

function FormPage () {
  const [newTask, setNewTask] = useState({
    title: '',
    description: ''
  })
  const router = useRouter()
  const params = useParams()

  const getTask = async () => {
    const res = await fetch(`/api/tasks/${params.id}`)
    const data = await res.json()

    setNewTask({
      title: data.title,
      description: data.description
    })
  }

  const createTask = async () => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(newTask),
        headers: {
          'Content-type': 'application/json'
        }
      })
      const data = await res.json()

      if (res.status === 200) {
        router.push('/')
        router.refresh()
      }

      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  const updateTask = async () => {
    const res = await fetch(`/api/tasks/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(newTask),
      header: { 'Content-type': 'applicattion/json' }
    })
    const data = await res.json()
    console.log(data)

    router.push('/')
    router.refresh()
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task')) {
      const res = await fetch(`/api/tasks/${params.id}`, {
        method: 'DELETE'
      })
      const data = await res.json()
      console.log(data)
    }
    router.push('/')
    router.refresh()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!params.id) {
      await createTask()
    } else {
      await updateTask()
    }
  }

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (params.id) {
      getTask()
    }
  }, [])

  return (
    <div className='h-[calc(100vh-7rem)] flex justify-center items-center '>
      <form onSubmit={handleSubmit}>
        <header className='flex justify-between'>
          <h1 className='font-bold text-3xl'>
            {
              !params.id ? 'Create Task' : 'Update Task'
            }
          </h1>
          <button
            type='button'
            onClick={handleDelete}
            className='bg-red-500 px-3 py-1 rounded-md'
          >
            Delete
          </button>
        </header>

        <input
          type='text'
          name='title'
          placeholder='Title'
          className='bg-gray-800 border-2 w-full p-4 rounded-lg my-2 font-bold'
          value={newTask.title}
          onChange={handleChange}
        />
        <textarea
          name='description'
          placeholder='Description'
          className='bg-gray-800 border-2 w-full p-4 rounded-lg my-2'
          rows='3'
          value={newTask.description}
          onChange={handleChange}
        />

        <button
          type='submit'
          className='bg-green-600 text-white font-bold px-4 py-2 rounded-lg'
        >
          {
            !params.id ? 'Create' : 'Update'
          }
        </button>
      </form>
    </div>
  )
}

export default FormPage
