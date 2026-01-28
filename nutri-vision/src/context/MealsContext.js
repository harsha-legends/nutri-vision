import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { format, subDays } from 'date-fns';
import mealService from '../services/mealService';

const MealsContext = createContext(null);

export const useMeals = () => {
  const context = useContext(MealsContext);
  if (!context) {
    throw new Error('useMeals must be used within a MealsProvider');
  }
  return context;
};

export const MealsProvider = ({ children }) => {
  const { user } = useAuth();
  const [todaysMeals, setTodaysMeals] = useState([]);
  const [mealHistory, setMealHistory] = useState({});
  const [loading, setLoading] = useState(false);

  // Auto-detect meal type based on current time
  const getMealTypeFromTime = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return 'breakfast';
    if (hour >= 11 && hour < 15) return 'lunch';
    if (hour >= 15 && hour < 18) return 'snack';
    return 'dinner';
  };

  const loadMeals = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Load today's meals
      const today = format(new Date(), 'yyyy-MM-dd');
      const result = await mealService.getMeals({ date: today });
      
      if (result.success) {
        // Handle both grouped meals (from API) and allMeals array
        const allMeals = result.allMeals || [];
        
        // Transform API response to match expected format
        const meals = allMeals.map(meal => {
          // Check if it's a database food or local food
          const foodInfo = meal.food || meal.localFoodInfo || {};
          const nutrition = meal.nutritionConsumed || {};
          
          return {
            id: foodInfo.id || foodInfo._id || meal._id,
            _id: foodInfo._id,
            name: foodInfo.name || 'Unknown Food',
            image: foodInfo.image,
            category: foodInfo.category,
            mealId: meal._id,
            mealType: meal.mealType,
            quantity: meal.quantity,
            addedAt: meal.createdAt || meal.date,
            nutrition: {
              calories: nutrition.calories || 0,
              protein: nutrition.protein || 0,
              carbs: nutrition.carbohydrates || 0,
              fats: nutrition.fat || 0,
              fiber: nutrition.fiber || 0,
              sugar: nutrition.sugar || 0,
            }
          };
        });
        setTodaysMeals(meals);
      }
    } catch (error) {
      console.error('Error loading meals:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Load historical data
  const loadMealHistory = useCallback(async (days = 7) => {
    if (!user) return {};
    
    try {
      const endDate = format(new Date(), 'yyyy-MM-dd');
      const startDate = format(subDays(new Date(), days - 1), 'yyyy-MM-dd');
      
      const result = await mealService.getMealsByDateRange(startDate, endDate);
      
      if (result.success) {
        // Handle allMeals from API response
        const allMeals = result.allMeals || [];
        
        // Group meals by date
        const history = {};
        allMeals.forEach(meal => {
          const dateKey = format(new Date(meal.date || meal.createdAt), 'yyyy-MM-dd');
          if (!history[dateKey]) {
            history[dateKey] = [];
          }
          
          // Handle both database foods and local foods
          const foodInfo = meal.food || meal.localFoodInfo || {};
          const nutrition = meal.nutritionConsumed || {};
          
          history[dateKey].push({
            id: foodInfo.id || foodInfo._id || meal._id,
            _id: foodInfo._id,
            name: foodInfo.name || 'Unknown Food',
            image: foodInfo.image,
            category: foodInfo.category,
            mealId: meal._id,
            mealType: meal.mealType,
            quantity: meal.quantity,
            addedAt: meal.createdAt || meal.date,
            nutrition: {
              calories: nutrition.calories || 0,
              protein: nutrition.protein || 0,
              carbs: nutrition.carbohydrates || 0,
              fats: nutrition.fat || 0,
              fiber: nutrition.fiber || 0,
              sugar: nutrition.sugar || 0,
            }
          });
        });
        setMealHistory(history);
        return history;
      }
    } catch (error) {
      console.error('Error loading meal history:', error);
    }
    return {};
  }, [user]);

  useEffect(() => {
    if (user) {
      loadMeals();
      loadMealHistory(7);
    }
  }, [user, loadMeals, loadMealHistory]);

  const addMeal = async (food, mealType = null, quantity = 1) => {
    if (!user) return { success: false, error: 'Not authenticated' };
    
    try {
      // Check if food has a valid MongoDB ObjectId (_id) or is a local food
      const isMongoId = food._id && /^[0-9a-fA-F]{24}$/.test(food._id);
      
      const mealPayload = {
        foodId: food._id || food.id,
        mealType: mealType || food.mealType || getMealTypeFromTime(),
        quantity: quantity,
        date: format(new Date(), 'yyyy-MM-dd'),
      };

      // If it's a local food (not in database), send the full food data
      if (!isMongoId) {
        mealPayload.foodData = {
          id: food.id,
          name: food.name,
          category: food.category,
          image: food.image,
          nutrition: food.nutrition,
          servingSize: food.servingSize,
        };
      }

      const result = await mealService.logMeal(mealPayload);
      
      if (result.success) {
        // Reload meals to get updated list
        await loadMeals();
        return { success: true };
      }
      return result;
    } catch (error) {
      console.error('Error adding meal:', error);
      return { success: false, error: error.message };
    }
  };

  const removeMeal = async (mealId) => {
    if (!user) return { success: false, error: 'Not authenticated' };
    
    try {
      const result = await mealService.deleteMeal(mealId);
      
      if (result.success) {
        // Update local state
        setTodaysMeals(prev => prev.filter(m => m.mealId !== mealId));
        return { success: true };
      }
      return result;
    } catch (error) {
      console.error('Error removing meal:', error);
      return { success: false, error: error.message };
    }
  };

  const updateMeal = async (mealId, updates) => {
    if (!user) return { success: false, error: 'Not authenticated' };
    
    try {
      const result = await mealService.updateMeal(mealId, updates);
      
      if (result.success) {
        await loadMeals();
        return { success: true };
      }
      return result;
    } catch (error) {
      console.error('Error updating meal:', error);
      return { success: false, error: error.message };
    }
  };

  const getTodaysTotals = () => {
    return todaysMeals.reduce((acc, meal) => ({
      calories: acc.calories + (meal.nutrition?.calories || 0),
      protein: acc.protein + (meal.nutrition?.protein || 0),
      carbs: acc.carbs + (meal.nutrition?.carbs || 0),
      fats: acc.fats + (meal.nutrition?.fats || 0),
      fiber: acc.fiber + (meal.nutrition?.fiber || 0),
      sugar: acc.sugar + (meal.nutrition?.sugar || 0),
    }), { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0, sugar: 0 });
  };

  const getHistoricalData = (days = 7) => {
    const data = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = format(date, 'yyyy-MM-dd');
      const dayMeals = mealHistory[dateKey] || [];
      
      const totals = dayMeals.reduce((acc, meal) => ({
        calories: acc.calories + (meal.nutrition?.calories || 0),
        protein: acc.protein + (meal.nutrition?.protein || 0),
        carbs: acc.carbs + (meal.nutrition?.carbs || 0),
        fats: acc.fats + (meal.nutrition?.fats || 0),
        fiber: acc.fiber + (meal.nutrition?.fiber || 0),
        sugar: acc.sugar + (meal.nutrition?.sugar || 0),
      }), { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0, sugar: 0 });
      
      data.push({
        date: format(date, 'MMM dd'),
        fullDate: dateKey,
        ...totals,
        meals: dayMeals,
      });
    }
    
    return data;
  };

  const value = {
    todaysMeals,
    mealHistory,
    loading,
    addMeal,
    removeMeal,
    updateMeal,
    getTodaysTotals,
    getHistoricalData,
    loadMeals,
    loadMealHistory,
  };

  return (
    <MealsContext.Provider value={value}>
      {children}
    </MealsContext.Provider>
  );
};

export default MealsContext;
