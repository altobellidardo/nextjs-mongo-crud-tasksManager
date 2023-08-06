import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

export function useForm () {
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

  return { newTask, handleDelete, handleSubmit, handleChange, params }
}
