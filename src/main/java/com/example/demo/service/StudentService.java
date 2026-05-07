package com.example.demo.service;

import com.example.demo.dto.StudentDTO;
import com.example.demo.model.Student;
import com.example.demo.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class StudentService {

    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    /**
     * Obtiene todos los estudiantes
     */
    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    /**
     * Obtiene un estudiante por ID
     */
    public Optional<Student> getStudentById(Long id) {
        return repository.findById(id);
    }

    /**
     * Crea un nuevo estudiante con validaciones
     */
    public Student createStudent(StudentDTO dto) {
        validateStudentData(dto);
        
        Student student = new Student();
        student.setName(dto.getName().trim());
        student.setAge(dto.getAge());
        student.setGrade(dto.getGrade().trim());
        student.setEmail(dto.getEmail().trim());
        
        return repository.save(student);
    }

    /**
     * Actualiza un estudiante existente
     */
    public Student updateStudent(Long id, StudentDTO dto) {
        validateStudentData(dto);
        
        Student student = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Estudiante no encontrado con ID: " + id));
        
        student.setName(dto.getName().trim());
        student.setAge(dto.getAge());
        student.setGrade(dto.getGrade().trim());
        student.setEmail(dto.getEmail().trim());
        
        return repository.save(student);
    }

    /**
     * Elimina un estudiante
     */
    public void deleteStudent(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Estudiante no encontrado con ID: " + id);
        }
        repository.deleteById(id);
    }

    /**
     * Valida los datos del estudiante
     */
    private void validateStudentData(StudentDTO dto) {
        if (dto.getName() == null || dto.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre no puede estar vacío");
        }
        
        if (dto.getName().length() < 3 || dto.getName().length() > 100) {
            throw new IllegalArgumentException("El nombre debe tener entre 3 y 100 caracteres");
        }
        
        if (dto.getAge() == null || dto.getAge() < 5 || dto.getAge() > 120) {
            throw new IllegalArgumentException("La edad debe estar entre 5 y 120 años");
        }
        
        if (dto.getGrade() == null || dto.getGrade().trim().isEmpty()) {
            throw new IllegalArgumentException("El grado no puede estar vacío");
        }
        
        if (dto.getEmail() == null || dto.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("El correo no puede estar vacío");
        }
        
        if (!isValidEmail(dto.getEmail())) {
            throw new IllegalArgumentException("El correo debe ser un email válido");
        }
    }

    /**
     * Valida el formato de un email
     */
    private boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
        return email.matches(emailRegex);
    }
}
