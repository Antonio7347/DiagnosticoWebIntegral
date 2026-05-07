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
  const [errors, setErrors] = useState({})

  useEffect(() => {
    loadStudents()
  }, [])

  const loadStudents = async () => {
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('No se pudo cargar los estudiantes')
      const data = await response.json()
      setStudents(data)
    } catch (error) {
      setStatus('❌ No se pudo cargar la lista de estudiantes.')
    }
  }

  /**
   * Validaciones en tiempo real para cada campo
   */
  const validateField = (name, value) => {
    const newErrors = { ...errors }

    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'El nombre no puede estar vacío'
        } else if (value.trim().length < 3) {
          newErrors.name = 'El nombre debe tener mínimo 3 caracteres'
        } else if (value.length > 100) {
          newErrors.name = 'El nombre no puede exceder 100 caracteres'
        } else {
          delete newErrors.name
        }
        break

      case 'age':
        const age = Number(value)
        if (!value) {
          newErrors.age = 'La edad es obligatoria'
        } else if (isNaN(age)) {
          newErrors.age = 'La edad debe ser un número'
        } else if (age < 5) {
          newErrors.age = 'La edad mínima es 5 años'
        } else if (age > 120) {
          newErrors.age = 'La edad máxima es 120 años'
        } else {
          delete newErrors.age
        }
        break

      case 'grade':
        if (!value.trim()) {
          newErrors.grade = 'El grado no puede estar vacío'
        } else if (value.length > 50) {
          newErrors.grade = 'El grado no puede exceder 50 caracteres'
        } else {
          delete newErrors.grade
        }
        break

      case 'email':
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!value.trim()) {
          newErrors.email = 'El correo es obligatorio'
        } else if (!emailRegex.test(value.trim())) {
          newErrors.email = 'Ingresa un correo válido (ej: usuario@ejemplo.com)'
        } else {
          delete newErrors.email
        }
        break

      default:
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    validateField(name, value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Validar todos los campos antes de enviar
    const isNameValid = validateField('name', form.name)
    const isAgeValid = validateField('age', form.age)
    const isGradeValid = validateField('grade', form.grade)
    const isEmailValid = validateField('email', form.email)

    if (!isNameValid || !isAgeValid || !isGradeValid || !isEmailValid) {
      setStatus('⚠️ Por favor corrige los errores en el formulario.')
      return
    }

    const student = {
      name: form.name.trim(),
      age: Number(form.age),
      grade: form.grade.trim(),
      email: form.email.trim(),
    }

    try {
      const response = editingId
        ? await fetch(`${API_URL}/${editingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student),
          })
        : await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student),
          })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      setStatus(editingId ? '✅ Estudiante actualizado correctamente.' : '✅ Estudiante registrado correctamente.')
      setForm(initialState)
      setEditingId(null)
      setErrors({})
      loadStudents()
    } catch (error) {
      setStatus('❌ Error guardando el estudiante: ' + error.message)
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
    setErrors({})
    setStatus('✏️ Editando estudiante seleccionado.')
  }

  const handleDelete = async (studentId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este estudiante?')) {
      return
    }

    try {
      const response = await fetch(`${API_URL}/${studentId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`No se pudo eliminar: HTTP ${response.status}`)
      }

      setStatus('✅ Estudiante eliminado correctamente.')
      loadStudents()
    } catch (error) {
      setStatus('❌ No se pudo eliminar el estudiante: ' + error.message)
    }
  }

  const handleCancel = () => {
    setForm(initialState)
    setEditingId(null)
    setErrors({})
    setStatus('⊗ Registro cancelado.')
  }

  return (
    <div className="app-container">
      <header>
        <h1>📚 Control de Estudiantes</h1>
        <p>Gestión completa de estudiantes con validaciones en tiempo real</p>
      </header>

      <section className="form-panel">
        <h2>{editingId ? '✏️ Editar estudiante' : '➕ Registrar estudiante'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Nombre
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ej. Carlos"
                className={errors.name ? 'input-error' : ''}
              />
              {errors.name && <span className="error-message">⚠️ {errors.name}</span>}
              <span className="char-count">{form.name.length}/100 caracteres</span>
            </label>
          </div>

          <div className="form-group">
            <label>
              Edad
              <input
                name="age"
                type="number"
                min="5"
                max="120"
                value={form.age}
                onChange={handleChange}
                placeholder="Ej. 21"
                className={errors.age ? 'input-error' : ''}
              />
              {errors.age && <span className="error-message">⚠️ {errors.age}</span>}
              {form.age && !errors.age && <span className="char-count">✅ Edad válida</span>}
            </label>
          </div>

          <div className="form-group">
            <label>
              Grado
              <input
                name="grade"
                value={form.grade}
                onChange={handleChange}
                placeholder="Ej. 3º"
                className={errors.grade ? 'input-error' : ''}
              />
              {errors.grade && <span className="error-message">⚠️ {errors.grade}</span>}
              <span className="char-count">{form.grade.length}/50 caracteres</span>
            </label>
          </div>

          <div className="form-group">
            <label>
              Correo
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="ejemplo@correo.com"
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <span className="error-message">⚠️ {errors.email}</span>}
              {form.email && !errors.email && <span className="char-count">✅ Email válido</span>}
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" disabled={Object.keys(errors).length > 0}>
              {editingId ? 'Actualizar' : 'Guardar'}
            </button>
            {editingId && (
              <button type="button" className="secondary" onClick={handleCancel}>
                Cancelar
              </button>
            )}
          </div>
        </form>
        {status && <div className={`status ${status.includes('❌') ? 'error' : 'success'}`}>{status}</div>}
      </section>

      <section className="list-panel">
        <h2>📋 Lista de estudiantes ({students.length})</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
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
                  <td colSpan="6" className="empty-message">
                    📭 No hay estudiantes registrados. ¡Crea el primero!
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id}>
                    <td className="id-cell">{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.age} años</td>
                    <td>{student.grade}</td>
                    <td className="email-cell">{student.email}</td>
                    <td className="actions-cell">
                      <button className="action edit" onClick={() => handleEdit(student)} title="Editar">
                        ✏️ Editar
                      </button>
                      <button className="action danger" onClick={() => handleDelete(student.id)} title="Eliminar">
                        🗑️ Eliminar
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
