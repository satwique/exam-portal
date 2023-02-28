package com.exam.services;

import java.util.Set;

import com.exam.entity.Category;

public interface CategoryService {
	public Category addCategory(Category category);
	public Category updateCategory(Category category);
	public void deleteCategory(Long categoryId);
	public Set<Category> getCategories();
	public Category getCategory(Long categoryId);

}
