package com.example.SlainteFit.model;

// import JPA package to manage relational data (helps with object-relational mapping)
import jakarta.persistence.*;

@Entity
public class NutritionLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String mealType;

    private int calories;
    private double protein;
    private double carbs;
    private double fats;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
