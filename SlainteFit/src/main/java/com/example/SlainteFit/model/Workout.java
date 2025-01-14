package com.example.SlainteFit.model;

// import JPA package to manage relational data (helps with object-relational mapping)
import jakarta.persistence.*;

@Entity
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String type;

    private int duration; // minutes
    private double caloriesBurned;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
}
