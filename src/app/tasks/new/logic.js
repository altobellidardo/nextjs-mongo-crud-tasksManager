import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

function useForm () {
  const [newTask, setNewTask] = useState({
    title: '',
    description: ''
  })
  const router = useRouter()

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createTask()
  }

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value })
  }

  return { newTask, handleSubmit, handleChange }
}
