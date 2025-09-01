package com.examly.springapp.Entity;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Category name is required")
    private String categoryName;

    @Min(value = 0, message = "Allocated amount must be zero or positive")
    private double allocatedAmount;

    private String description;

    private double spentAmount = 0;

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
