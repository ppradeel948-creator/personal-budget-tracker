package com.examly.springapp.dto;

public class BudgetSummaryDto {
  private String categoryName;
  private Double allocatedAmount;
  private Double spentAmount;
  private Double remainingAmount;
  public BudgetSummaryDto(String categoryName, Double allocatedAmount, Double spentAmount) {
    this.categoryName = categoryName;
    this.allocatedAmount = allocatedAmount;
    this.spentAmount = spentAmount;
    this.remainingAmount=allocatedAmount-spentAmount;
  }
  public String getCategoryName() {
    return categoryName;
  }
  public void setCategoryName(String categoryName) {
    this.categoryName = categoryName;
  }
  public Double getAllocatedAmount() {
    return allocatedAmount;
  }
  public void setAllocatedAmount(Double allocatedAmount) {
    this.allocatedAmount = allocatedAmount;
  }
  public Double getSpentAmount() {
    return spentAmount;
  }
  public void setSpentAmount(Double spentAmount) {
    this.spentAmount = spentAmount;
    this.remainingAmount=allocatedAmount-spentAmount;
  }
  public Double getRemainingAmount() {
    return remainingAmount;
  }
  public void setRemainingAmount(Double remainingAmount) {
    this.remainingAmount = remainingAmount;
  }
  
  
}

