import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { format } from 'date-fns';

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
  const [mealHistory, setMealHistory] = useState([]);

  const loadMeals = React.useCallback(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const storedMeals = JSON.parse(localStorage.getItem(`meals_${user?.id}`) || '{}');
    setTodaysMeals(storedMeals[today] || []);
    setMealHistory(storedMeals);
  }, [user?.id]);

  useEffect(() => {
    if (user) {
      loadMeals();
    }
  }, [user, loadMeals]);

  const addMeal = (food, mealType = null) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const storedMeals = JSON.parse(localStorage.getItem(`meals_${user?.id}`) || '{}');
    
    // Auto-detect meal type based on current time if not provided
    const getMealTypeFromTime = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 11) return 'breakfast';
      if (hour >= 11 && hour < 15) return 'lunch';
      if (hour >= 15 && hour < 18) return 'snack';
      return 'dinner';
    };
    
    const mealEntry = {
      ...food,
      addedAt: new Date().toISOString(),
      mealId: Date.now().toString(),
      mealType: mealType || food.mealType || getMealTypeFromTime(),
    };
    
    if (!storedMeals[today]) {
      storedMeals[today] = [];
    }
    storedMeals[today].push(mealEntry);
    
    localStorage.setItem(`meals_${user?.id}`, JSON.stringify(storedMeals));
    setTodaysMeals(storedMeals[today]);
    setMealHistory(storedMeals);
  };

  const removeMeal = (mealId) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const storedMeals = JSON.parse(localStorage.getItem(`meals_${user?.id}`) || '{}');
    
    if (storedMeals[today]) {
      storedMeals[today] = storedMeals[today].filter(m => m.mealId !== mealId);
      localStorage.setItem(`meals_${user?.id}`, JSON.stringify(storedMeals));
      setTodaysMeals(storedMeals[today]);
      setMealHistory(storedMeals);
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
    addMeal,
    removeMeal,
    getTodaysTotals,
    getHistoricalData,
    loadMeals,
  };

  return (
    <MealsContext.Provider value={value}>
      {children}
    </MealsContext.Provider>
  );
};

export default MealsContext;
