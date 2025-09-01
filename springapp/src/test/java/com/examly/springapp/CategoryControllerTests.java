package com.examly.springapp;

import com.examly.springapp.controller.CategoryController;
import com.examly.springapp.dto.BudgetSummaryDto;
import com.examly.springapp.model.Category;
import com.examly.springapp.service.BudgetService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.*;

import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;

public class CategoryControllerTests {

    private MockMvc mockMvc;

    @InjectMocks
    private CategoryController categoryController;

    @Mock
    private BudgetService budgetService;

    private ObjectMapper objectMapper;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(categoryController).build();
        objectMapper = new ObjectMapper();
    }



    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_testGetAllCategories() throws Exception {
        Category cat1 = new Category();
        cat1.setId(1L);
        cat1.setCategoryName("Groceries");
        cat1.setAllocatedAmount(500);
        cat1.setDescription("Monthly groceries");

        Category cat2 = new Category();
        cat2.setId(2L);
        cat2.setCategoryName("Utilities");
        cat2.setAllocatedAmount(200);
        cat2.setDescription("Monthly utilities");

        List<Category> categories = Arrays.asList(cat1, cat2);

        when(budgetService.getAllCategories()).thenReturn(categories);

        mockMvc.perform(get("/api/categories"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].categoryName", is("Groceries")))
                .andExpect(jsonPath("$[1].categoryName", is("Utilities")));

        verify(budgetService, times(1)).getAllCategories();
    }

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_testDeleteCategory() throws Exception {
        doNothing().when(budgetService).deleteCategory(1L);

        mockMvc.perform(delete("/api/categories/1"))
                .andExpect(status().isOk());

        verify(budgetService, times(1)).deleteCategory(1L);
    }

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_testGetBudgetSummary() throws Exception {
        BudgetSummaryDto summary1 = new BudgetSummaryDto("Groceries", 500.0, 300.0);
        BudgetSummaryDto summary2 = new BudgetSummaryDto("Utilities", 200.0, 50.0);

        List<BudgetSummaryDto> summaries = Arrays.asList(summary1, summary2);

        when(budgetService.getBudgetSummary()).thenReturn(summaries);

        mockMvc.perform(get("/api/categories/summary"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].categoryName", is("Groceries")))
                .andExpect(jsonPath("$[0].allocatedAmount", is(500.0)))
                .andExpect(jsonPath("$[0].spentAmount", is(300.0)))
                .andExpect(jsonPath("$[0].remainingAmount", is(200.0)))
                .andExpect(jsonPath("$[1].categoryName", is("Utilities")));

        verify(budgetService, times(1)).getBudgetSummary();
    }

  

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_testGetAllCategories_EmptyList() throws Exception {
        when(budgetService.getAllCategories()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/categories"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));

        verify(budgetService, times(1)).getAllCategories();
    }

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_testAddCategory_NullBody() throws Exception {
        mockMvc.perform(post("/api/categories")
                .contentType(MediaType.APPLICATION_JSON)
                .content(""))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_testGetBudgetSummary_Empty() throws Exception {
        when(budgetService.getBudgetSummary()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/categories/summary"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));

        verify(budgetService, times(1)).getBudgetSummary();
    }
@Test
public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_testGetAllCategories_SingleCategory() throws Exception {
    Category cat = new Category();
    cat.setId(5L);
    cat.setCategoryName("Health");
    cat.setAllocatedAmount(300);
    cat.setDescription("Medical expenses");

    when(budgetService.getAllCategories()).thenReturn(Collections.singletonList(cat));

    mockMvc.perform(get("/api/categories"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(1)))
            .andExpect(jsonPath("$[0].categoryName", is("Health")))
            .andExpect(jsonPath("$[0].allocatedAmount", is(300.0)))
            .andExpect(jsonPath("$[0].description", is("Medical expenses")));

    verify(budgetService, times(1)).getAllCategories();
}

@Test
public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_testGetBudgetSummary_WithZeroSpent() throws Exception {
    BudgetSummaryDto summary = new BudgetSummaryDto("Travel", 1000.0, 0.0);
    when(budgetService.getBudgetSummary()).thenReturn(Collections.singletonList(summary));

    mockMvc.perform(get("/api/categories/summary"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(1)))
            .andExpect(jsonPath("$[0].categoryName", is("Travel")))
            .andExpect(jsonPath("$[0].allocatedAmount", is(1000.0)))
            .andExpect(jsonPath("$[0].spentAmount", is(0.0)))
            .andExpect(jsonPath("$[0].remainingAmount", is(1000.0)));

    verify(budgetService, times(1)).getBudgetSummary();
}

@Test
public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_testAddCategory_EmptyJson() throws Exception {
    mockMvc.perform(post("/api/categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{}"))
            .andExpect(status().isOk()); // No validation, so empty fields accepted
}
@Test
public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_testDeleteCategory_NoIdProvided() throws Exception {
    // Trying to delete without providing an ID in the URL, should return 405 Method Not Allowed
    mockMvc.perform(delete("/api/categories/"))
            .andExpect(status().isMethodNotAllowed());
}

}
