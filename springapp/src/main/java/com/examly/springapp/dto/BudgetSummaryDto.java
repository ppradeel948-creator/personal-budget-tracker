package com.examly.springapp.dto;

import java.math.BigDecimal;

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

    public BudgetSummaryDto(String categoryName, double allocatedAmount, double spentAmount) {
        this.categoryName = categoryName;
        this.allocatedAmount = allocatedAmount;
        this.spentAmount = spentAmount;
        this.remainingAmount = allocatedAmount - spentAmount;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public double getAllocatedAmount() {
        return allocatedAmount;
    }

    public void setAllocatedAmount(double allocatedAmount) {
        this.allocatedAmount = allocatedAmount;
    }

    public double getSpentAmount() {
        return spentAmount;
    }

    public void setSpentAmount(double spentAmount) {
        this.spentAmount = spentAmount;
    }

    public double getRemainingAmount() {
        return remainingAmount;
    }

    public void setRemainingAmount(double remainingAmount) {
        this.remainingAmount = remainingAmount;
    }
}