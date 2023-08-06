import { connectDB } from '@/utils/mongoose'
import Task from '@/models/Task'
import TaskCard from '@/components/TaskCard'

async function loadTasks () {
  connectDB()
  const tasks = await Task.find()
  return tasks
}

function WithTasks ({ tasks }) {
  return (
    <div className='grid grid-cols-3 gap-2'>
      {
        tasks.map(task => (
          <TaskCard key={task._id} task={task} />
        ))
      }
    </div>
  )
}

function NoTasks () {
  return (
    <div className='flex items-center w-full flex-col mt-20'>
      <h3 className='text-3xl font-bold'>No task created</h3>
      <p>to add a task click on the  '<strong>+ New Task</strong>' button</p>
    </div>
  )
}

async function HomePage () {
  const tasks = await loadTasks()

  return (
    <>
      {
        tasks.length ? (<WithTasks tasks={tasks} />) : <NoTasks />
      }
    </>
  )
}

export default HomePage
