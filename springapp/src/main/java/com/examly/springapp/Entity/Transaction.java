package com.examly.springapp.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "user_id", insertable = false, updatable = false)
    private Long userId;

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.01", message = "Amount must be positive")
    @Column(precision = 15, scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @Size(max = 255)
    private String description;

    @NotNull(message = "Transaction date is required")
    @PastOrPresent(message = "Transaction date cannot be in the future")
    private LocalDate transactionDate;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @Size(max = 500)
    private String receiptImageUrl;

    private Boolean isRecurring = false;

    @Enumerated(EnumType.STRING)
    private RecurringFrequency recurringFrequency;

    @Size(max = 255)
    private String tags;

    @Column(updatable = false)
    private LocalDateTime createdDate = LocalDateTime.now();

    public enum TransactionType {
        INCOME, EXPENSE, TRANSFER
    }

    public enum PaymentMethod {
        CASH, CARD, BANK_TRANSFER, CHECK, OTHER
    }

    public enum RecurringFrequency {
        DAILY, WEEKLY, MONTHLY, YEARLY
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
        if (this.user == null) {
            this.user = new User();
        }
        this.user.setId(userId);
    }
}