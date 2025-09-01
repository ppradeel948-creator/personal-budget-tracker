package com.examly.springapp.Services;


import org.springframework.stereotype.Service;

import com.examly.springapp.Entity.Account;
import com.examly.springapp.Repositories.AccountRepository;

import java.util.List;

@Service
public class AccountService {
    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public List<Account> getAccountsByUserId(Long userId) {
        return accountRepository.findByUserId(userId);
    }

    public Account saveAccount(Account account) {
        return accountRepository.save(account);
    }
}
