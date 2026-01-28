package com.examly.springapp.dto;

import java.math.BigDecimal;

public class BudgetSummaryDto {

    private String categoryName;
    private BigDecimal allocatedAmount;
    private BigDecimal spentAmount;
    private BigDecimal remainingAmount;

    public BudgetSummaryDto() {}

    public BudgetSummaryDto(String categoryName, BigDecimal allocatedAmount, BigDecimal spentAmount, BigDecimal remainingAmount) {
        this.categoryName = categoryName;
        this.allocatedAmount = allocatedAmount;
        this.spentAmount = spentAmount;
        this.remainingAmount = remainingAmount;
    }

    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
    
    public BigDecimal getAllocatedAmount() { return allocatedAmount; }
    public void setAllocatedAmount(BigDecimal allocatedAmount) { this.allocatedAmount = allocatedAmount; }
    
    public BigDecimal getSpentAmount() { return spentAmount; }
    public void setSpentAmount(BigDecimal spentAmount) { this.spentAmount = spentAmount; }
    
    public BigDecimal getRemainingAmount() { return remainingAmount; }
    public void setRemainingAmount(BigDecimal remainingAmount) { this.remainingAmount = remainingAmount; }
}
