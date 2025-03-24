import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import axios from "axios";

// Define the expected structure of a health data item
interface HealthDataResponseItem {
  health_id: number;
  date: string;
  mood: number;
  hoursOfSleep: number;
  screenTime: number;
  timeOutdoors: boolean;
}

// Define the hook return type with averages
interface UseHealthDataResponse {
  healthData: HealthDataResponseItem[];
  suggestions: string;
  averages: {
    mood: string;
    sleep: string;
    screenTime: string;
    outdoorsPercentage: string;
  };
}

const useHealthDataResponse = (): UseHealthDataResponse => {
  const { token, user } = useAuth();
  const [healthData, setHealthData] = useState<HealthDataResponseItem[]>([]);
  const [suggestions, setSuggestions] = useState<string>("");
  const [averages, setAverages] = useState({
    mood: "0",
    sleep: "0",
    screenTime: "0",
    outdoorsPercentage: "0",
  });

  useEffect(() => {
    if (user?.id && token) {
      fetchHealthDataResponse();
    }
  }, [user?.id, token]);

  const fetchHealthDataResponse = async (): Promise<void> => {
    try {
      const response = await axios.get<HealthDataResponseItem[]>(
        `https://sd1-backend.onrender.com/api/healthdata/lastweek/${user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Fetched Health Data:", response.data);
      setHealthData(response.data);
      processHealthData(response.data);
    } catch (error) {
      console.error("Error fetching health data:", error);
    }
  };

  const processHealthData = (data: HealthDataResponseItem[]): void => {
    if (data.length === 0) {
      setSuggestions("Not enough data to analyze trends.");
      return;
    }

    const totalMood = data.reduce((acc, item) => acc + item.mood, 0);
    const totalSleep = data.reduce((acc, item) => acc + item.hoursOfSleep, 0);
    const totalScreenTime = data.reduce(
      (acc, item) => acc + item.screenTime,
      0
    );
    const totalOutdoors = data.filter(
      (item) => item.timeOutdoors === true
    ).length;

    const avgMood = (totalMood / data.length).toFixed(1);
    const avgSleep = (totalSleep / data.length).toFixed(1);
    const avgScreenTime = (totalScreenTime / data.length).toFixed(1);
    const outdoorsPercentage = ((totalOutdoors / data.length) * 100).toFixed(1);

    // Save the averages
    setAverages({
      mood: avgMood,
      sleep: avgSleep,
      screenTime: avgScreenTime,
      outdoorsPercentage: outdoorsPercentage,
    });

    generateSuggestions(avgMood, avgSleep, avgScreenTime, outdoorsPercentage);
  };

  const generateSuggestions = (
    avgMood: string,
    avgSleep: string,
    avgScreenTime: string,
    outdoorsPercentage: string
  ): void => {
    let newSuggestions: string[] = [];

    if (parseFloat(avgSleep) < 6) {
      newSuggestions.push(
        "You're not getting enough sleep. Aim for 7-9 hours per night."
      );
    } else if (parseFloat(avgSleep) > 9) {
      newSuggestions.push(
        "You're sleeping a lot! If you're still feeling tired, consider checking your sleep quality."
      );
    }

    if (parseFloat(avgScreenTime) > 5) {
      newSuggestions.push(
        "Your screen time is high. Try taking breaks and reducing usage before bed."
      );
    }

    if (parseFloat(outdoorsPercentage) < 50) {
      newSuggestions.push(
        "You're spending less time outdoors. Fresh air and sunlight can improve mood and energy."
      );
    }
    if (parseFloat(avgMood) > 5) {
      newSuggestions.push(
        "You've been in a great mood recently! Your healthy lifestyle is paying off."
      );
    }

    if (parseFloat(avgMood) < 5) {
      newSuggestions.push(
        "Your mood has been on the low side recently. Excersing regularly, eating healthily, sleeping well, reducing screen time, and being outdoors are all great ways to improve this! However, don't forgot to check in with friends, family, or your GP if you feel you're struggling."
      );
    }

    setSuggestions(
      newSuggestions.length
        ? newSuggestions.join("\n")
        : "You're maintaining a good balance!"
    );
  };

  //   console.log(healthData);
  //   console.log(suggestions);

  return { healthData, suggestions, averages };
};

export default useHealthDataResponse;
