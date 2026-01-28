package com.examly.springapp.dto;

import com.examly.springapp.Entity.Transaction;
import lombok.Data;
import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class TransactionRequest {
    @NotNull(message = "Account ID is required")
    private Long accountId;
    
    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.01", message = "Amount must be positive")
    @Digits(integer = 13, fraction = 2, message = "Amount format is invalid")
    private BigDecimal amount;
    
    @NotNull(message = "Transaction type is required")
    private Transaction.TransactionType transactionType;
    
    @NotNull(message = "Category ID is required")
    private Long categoryId;
    
    @Size(max = 255, message = "Description must be under 255 characters")
    private String description;
    
    @NotNull(message = "Transaction date is required")
    private LocalDate transactionDate;
    
    private Transaction.PaymentMethod paymentMethod;
    private String receiptImageUrl;
    private Boolean isRecurring = false;
    private Transaction.RecurringFrequency recurringFrequency;
    private String tags;
}