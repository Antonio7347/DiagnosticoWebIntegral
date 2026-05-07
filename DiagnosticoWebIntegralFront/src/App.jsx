import { useEffect, useState } from 'react'
import './App.css'

const API_URL = 'http://localhost:8080/api/students'

function App() {
  const initialState = {
    name: '',
    age: '',
    grade: '',
    email: '',
  }

  const [students, setStudents] = useState([])
  const [form, setForm] = useState(initialState)
  const [editingId, setEditingId] = useState(null)
  const [status, setStatus] = useState('')

  useEffect(() => {
    loadStudents()
  }, [])

  const loadStudents = async () => {
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      setStudents(data)
    } catch (error) {
      setStatus('No se pudo cargar la lista de estudiantes.')
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const student = {
      name: form.name.trim(),
      age: Number(form.age),
      grade: form.grade.trim(),
      email: form.email.trim(),
    }

    if (!student.name || !student.grade || !student.email || !student.age) {
      setStatus('Complete todos los campos antes de guardar.')
      return
    }

    try {
      if (editingId) {
        await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(student),
        })
        setStatus('Estudiante actualizado correctamente.')
      } else {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(student),
        })
        setStatus('Estudiante registrado correctamente.')
      }
      setForm(initialState)
      setEditingId(null)
      loadStudents()
    } catch (error) {
      setStatus('Error guardando el estudiante.')
    }
  }

  const handleEdit = (student) => {
    setForm({
      name: student.name,
      age: student.age || '',
      grade: student.grade,
      email: student.email,
    })
    setEditingId(student.id)
    setStatus('Editando estudiante seleccionado.')
  }

  const handleDelete = async (studentId) => {
    if (!window.confirm('¿Eliminar este estudiante?')) {
      return
    }

    try {
      await fetch(`${API_URL}/${studentId}`, {
        method: 'DELETE',
      })
      setStatus('Estudiante eliminado correctamente.')
      loadStudents()
    } catch (error) {
      setStatus('No se pudo eliminar el estudiante.')
    }
  }

  const handleCancel = () => {
    setForm(initialState)
    setEditingId(null)
    setStatus('Registro cancelado.')
  }

  return (
    <div className="app-container">
      <header>
        <h1>Control de Estudiantes</h1>
        <p>CRUD básico para gestionar estudiantes con nombre, edad, grado y correo.</p>
      </header>

      <section className="form-panel">
        <h2>{editingId ? 'Editar estudiante' : 'Registrar estudiante'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre
            <input name="name" value={form.name} onChange={handleChange} placeholder="Ej. Carlos" />
          </label>
          <label>
            Edad
            <input
              name="age"
              type="number"
              min="1"
              value={form.age}
              onChange={handleChange}
              placeholder="Ej. 21"
            />
          </label>
          <label>
            Grado
            <input name="grade" value={form.grade} onChange={handleChange} placeholder="Ej. 3º" />
          </label>
          <label>
            Correo
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="ejemplo@correo.com"
            />
          </label>

          <div className="form-actions">
            <button type="submit">{editingId ? 'Actualizar' : 'Guardar'}</button>
            {editingId && (
              <button type="button" className="secondary" onClick={handleCancel}>
                Cancelar
              </button>
            )}
          </div>
        </form>
        {status && <div className="status">{status}</div>}
      </section>

      <section className="list-panel">
        <h2>Lista de estudiantes</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Grado</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="5">No hay estudiantes registrados.</td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.age}</td>
                    <td>{student.grade}</td>
                    <td>{student.email}</td>
                    <td>
                      <button className="action" onClick={() => handleEdit(student)}>
                        Editar
                      </button>
                      <button className="action danger" onClick={() => handleDelete(student.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default App
