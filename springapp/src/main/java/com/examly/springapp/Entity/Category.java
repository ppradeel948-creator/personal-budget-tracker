package com.examly.springapp.Entity;

import javax.persistence.*;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String categoryName;
    private double allocatedAmount;
    private String description;

    private double spentAmount = 0;

    // Constructors
    public Category() {}

    public Category(String categoryName, double allocatedAmount, String description) {
        this.categoryName = categoryName;
        this.allocatedAmount = allocatedAmount;
        this.description = description;
        this.spentAmount = 0;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
    public double getAllocatedAmount() { return allocatedAmount; }
    public void setAllocatedAmount(double allocatedAmount) { this.allocatedAmount = allocatedAmount; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public double getSpentAmount() { return spentAmount; }
    public void setSpentAmount(double spentAmount) { this.spentAmount = spentAmount; }
}
