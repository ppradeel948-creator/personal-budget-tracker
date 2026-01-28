package com.examly.springapp.Controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.Arrays;

@RestController
@RequestMapping("/api/plaid")
@CrossOrigin(origins = "*")
public class PlaidController {

    @Value("${plaid.client.id:your_plaid_client_id}")
    private String plaidClientId;

    @Value("${plaid.secret:your_plaid_secret}")
    private String plaidSecret;

    @Value("${plaid.environment:sandbox}")
    private String plaidEnvironment;

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/link-token")
    public ResponseEntity<?> createLinkToken(@RequestBody Map<String, Object> request) {
        try {
            String plaidUrl = getPlaidUrl() + "/link/token/create";
            
            Map<String, Object> plaidRequest = new HashMap<>();
            plaidRequest.put("client_id", plaidClientId);
            plaidRequest.put("secret", plaidSecret);
            plaidRequest.put("client_name", "Budget Tracker");
            plaidRequest.put("country_codes", Arrays.asList("US"));
            plaidRequest.put("language", "en");
            plaidRequest.put("products", Arrays.asList("transactions", "accounts"));
            
            Map<String, Object> user = new HashMap<>();
            user.put("client_user_id", request.get("user_id"));
            plaidRequest.put("user", user);

            ResponseEntity<Map> response = restTemplate.postForEntity(plaidUrl, plaidRequest, Map.class);
            return ResponseEntity.ok(response.getBody());
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to create link token: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/exchange-token")
    public ResponseEntity<?> exchangePublicToken(@RequestBody Map<String, String> request) {
        try {
            String plaidUrl = getPlaidUrl() + "/item/public_token/exchange";
            
            Map<String, Object> plaidRequest = new HashMap<>();
            plaidRequest.put("client_id", plaidClientId);
            plaidRequest.put("secret", plaidSecret);
            plaidRequest.put("public_token", request.get("public_token"));

            ResponseEntity<Map> response = restTemplate.postForEntity(plaidUrl, plaidRequest, Map.class);
            return ResponseEntity.ok(response.getBody());
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to exchange token: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/accounts")
    public ResponseEntity<?> getAccounts(@RequestBody Map<String, String> request) {
        try {
            String plaidUrl = getPlaidUrl() + "/accounts/get";
            
            Map<String, Object> plaidRequest = new HashMap<>();
            plaidRequest.put("client_id", plaidClientId);
            plaidRequest.put("secret", plaidSecret);
            plaidRequest.put("access_token", request.get("access_token"));

            ResponseEntity<Map> response = restTemplate.postForEntity(plaidUrl, plaidRequest, Map.class);
            return ResponseEntity.ok(response.getBody());
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to get accounts: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/transactions")
    public ResponseEntity<?> getTransactions(@RequestBody Map<String, Object> request) {
        try {
            String plaidUrl = getPlaidUrl() + "/transactions/get";
            
            Map<String, Object> plaidRequest = new HashMap<>();
            plaidRequest.put("client_id", plaidClientId);
            plaidRequest.put("secret", plaidSecret);
            plaidRequest.put("access_token", request.get("access_token"));
            plaidRequest.put("start_date", request.get("start_date"));
            plaidRequest.put("end_date", request.get("end_date"));
            plaidRequest.put("count", request.getOrDefault("count", 100));

            ResponseEntity<Map> response = restTemplate.postForEntity(plaidUrl, plaidRequest, Map.class);
            return ResponseEntity.ok(response.getBody());
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to get transactions: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    private String getPlaidUrl() {
        switch (plaidEnvironment.toLowerCase()) {
            case "production":
                return "https://production.plaid.com";
            case "development":
                return "https://development.plaid.com";
            default:
                return "https://sandbox.plaid.com";
        }
    }
}