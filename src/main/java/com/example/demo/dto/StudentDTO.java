package com.example.demo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class StudentDTO {

    @NotBlank(message = "El nombre no puede estar vacío")
    @Size(min = 3, max = 100, message = "El nombre debe tener entre 3 y 100 caracteres")
    private String name;

    @Min(value = 5, message = "La edad mínima es 5 años")
    @Max(value = 120, message = "La edad máxima es 120 años")
    private Integer age;

    @NotBlank(message = "El grado no puede estar vacío")
    @Size(min = 1, max = 50, message = "El grado debe tener entre 1 y 50 caracteres")
    private String grade;

    @NotBlank(message = "El correo no puede estar vacío")
    @Email(message = "El correo debe ser un email válido")
    private String email;

    // Constructores
    public StudentDTO() {
    }

    public StudentDTO(String name, Integer age, String grade, String email) {
        this.name = name;
        this.age = age;
        this.grade = grade;
        this.email = email;
    }

    // Getters y Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
