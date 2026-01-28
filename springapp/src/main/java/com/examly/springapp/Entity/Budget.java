package com.examly.springapp.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "budgets")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotBlank(message = "Budget name is required")
    @Size(max = 100)
    private String budgetName;

    @NotNull(message = "Total amount is required")
    @DecimalMin(value = "0.01", message = "Total amount must be positive")
    @Column(precision = 15, scale = 2)
    private BigDecimal totalAmount;

    @Enumerated(EnumType.STRING)
    private BudgetPeriod period;

    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    @NotNull(message = "End date is required")
    private LocalDate endDate;

    private Boolean isActive = true;

    @Column(updatable = false)
    private LocalDateTime createdDate = LocalDateTime.now();



    public enum BudgetPeriod {
        WEEKLY, MONTHLY, QUARTERLY, YEARLY
    }
    
    public void setUserId(Long userId) {
        if (this.user == null) {
            this.user = new User();
        }
        this.user.setId(userId);
    }
}