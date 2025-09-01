package com.examly.springapp.dto;

public class BudgetSummaryDto {

    private String categoryName;
    private double allocatedAmount;
    private double spentAmount;
    private double remainingAmount;

    public BudgetSummaryDto() {}

    public BudgetSummaryDto(String categoryName, double allocatedAmount, double spentAmount, double remainingAmount) {
        this.categoryName = categoryName;
        this.allocatedAmount = allocatedAmount;
        this.spentAmount = spentAmount;
        this.remainingAmount = remainingAmount;
    }

    // New overloaded constructor
    public BudgetSummaryDto(String categoryName, double allocatedAmount, double spentAmount) {
        this.categoryName = categoryName;
        this.allocatedAmount = allocatedAmount;
        this.spentAmount = spentAmount;
        this.remainingAmount = allocatedAmount - spentAmount;
    }

    // Getters and setters...
}
