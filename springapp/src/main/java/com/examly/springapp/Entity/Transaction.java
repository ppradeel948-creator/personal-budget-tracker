package com.examly.springapp.Entity;


import java.math.BigDecimal;
import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;

    private Long categoryId;

    private String description;

    private Timestamp transactionDate;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    private String receiptImageUrl;

    private boolean isRecurring = false;

    @Enumerated(EnumType.STRING)
    private RecurringFrequency recurringFrequency;

    private String tags;

    private Timestamp createdDate;

    public enum TransactionType {
        INCOME, EXPENSE, TRANSFER
    }

    public enum PaymentMethod {
        CASH, CARD, BANK_TRANSFER, CHECK, OTHER
    }

    public enum RecurringFrequency {
        DAILY, WEEKLY, MONTHLY, YEARLY
    }
}