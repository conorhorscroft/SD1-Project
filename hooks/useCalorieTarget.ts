import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";

const useCalorieTarget = () => {
  // Pull user profile data from react context
  const { user, fetchUser } = useAuth();
  const [calorieTarget, setCalorieTarget] = useState(0);

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    // Only proceed if user data is fully loaded
    if (!user) return;

    // Assign default values if unavailable
    const endurance = user?.endurance ?? 0;
    const strength = user?.strength ?? 0;
    const weightLoss = user?.weightLoss ?? 0;
    const hoursAvailable = user?.hoursAvailable ?? 0;
    const weight = user?.weight ?? 70;
    const height = user?.height ?? 160;
    const age = user?.age ?? 18;

    // Calculate BMR based on revised Harris-Benedict equation
    let basalMetabolicRate;
    let calculatedCalorieTarget;
    let activityMultiplier;

    if (user?.gender === "Male") {
      basalMetabolicRate =
        13.397 * weight + 4.799 * height - 5.677 * age + 88.362;
    } else {
      basalMetabolicRate =
        9.247 * weight + 3.098 * height - 4.33 * age + 447.593;
    }

    // Determine activity multiplier based on hours available
    if (hoursAvailable <= 1) {
      activityMultiplier = 1.2;
    } else if (hoursAvailable <= 4) {
      activityMultiplier = 1.375;
    } else if (hoursAvailable <= 9) {
      activityMultiplier = 1.55;
    } else if (hoursAvailable <= 14) {
      activityMultiplier = 1.725;
    } else {
      activityMultiplier = 1.9;
    }

    // Initial calorie target based on BMR and activity level
    calculatedCalorieTarget = basalMetabolicRate * activityMultiplier;

    // Adjust for training focus
    const totalFocus = endurance + strength + weightLoss;
    const enduranceRatio = endurance / totalFocus;
    const strengthRatio = strength / totalFocus;
    const weightLossRatio = weightLoss / totalFocus;

    // Endurance adjustment
    if (endurance > strength && endurance > weightLoss) {
      calculatedCalorieTarget *= 1 + enduranceRatio * 0.15;
    }

    // Strength adjustment
    if (strength > endurance && strength > weightLoss) {
      calculatedCalorieTarget *= 1 + strengthRatio * 0.15;
    }

    // Weight loss adjustment (caloric deficit)
    if (weightLoss > endurance && weightLoss > strength) {
      calculatedCalorieTarget *= 1 - weightLossRatio * 0.3;
    }

    // Final calorie target (round to nearest 50)
    calculatedCalorieTarget = Math.round(calculatedCalorieTarget / 50) * 50;

    // Update state
    setCalorieTarget(calculatedCalorieTarget);
  }, [user]);

  return calorieTarget;
};

export default useCalorieTarget;
