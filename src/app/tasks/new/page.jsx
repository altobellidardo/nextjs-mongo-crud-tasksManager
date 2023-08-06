'use client'
import { useForm } from './logic'

function FormPage () {
  const { newTask, handleDelete, handleSubmit, handleChange, params } = useForm()

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
