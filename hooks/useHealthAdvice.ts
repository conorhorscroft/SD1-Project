import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { useAuth } from "@/hooks/useAuth";

// Define interface for API response
interface HealthAdviceResponse {
  advice: string;
  // disclaimer: string;
}

// Define Class to handle AI interactions
export class HealthAdvisor {
  private genAI: GoogleGenerativeAI;
  private model: any;

  // Takes API key to initialise Gemini
  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({
      // best text model
      model: "gemini-1.5-pro",
      // safety settings to prevent inappropriate content
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });
  }

  // takes users profile and specific health topic they want advice on
  async generateAdvice(
    user: {
      name?: string;
      age?: number;
      weight?: number;
      height?: number;
      experience?: number;
      strength?: number;
      endurance?: number;
      weightLoss?: number;
      health?: number;
      gender?: string;
      hoursAvailable?: number;
    },
    concernOrGoal: string
    // returns our health advice response interface
  ): Promise<HealthAdviceResponse> {
    try {
      // Create a structured prompt
      let bmi;
      if (user.height && user.weight) {
        bmi = (
          user.weight /
          ((user.height / 100) * (user.height / 100))
        ).toFixed(1);
      }
      const prompt = `As a wellness guide, provide brief general lifestyle and wellness advice for a person with the following profile:

  ${user.age ? `- Age: ${user.age} years` : ""}
  ${user.weight ? `- Weight: ${user.weight} kg` : ""}
  ${user.height ? `- Height: ${user.height} cm` : ""}
  ${user.gender ? `- Gender: ${user.gender}` : ""}
  ${bmi ? `- BMI: ${bmi}` : ""}
  ${
    user.experience
      ? `- Fitness Experience Level out of 10: ${user.experience}`
      : ""
  }
  ${`- Their respective goals for these categories out of 10 are as follows; Strength: ${user.health}, Endurance: ${user.endurance}, Weight Loss: ${user.weightLoss}, General Health: ${user.health}`}
  ${
    user.hoursAvailable
      ? `- They have ${user.hoursAvailable} hours available to train per week`
      : ""
  }

  They are seeking advice about: ${concernOrGoal}

 Please provide your response in markdown format with the following structure:
1. Make general reference to the details provided for the user profile (don't mention specific numbers)
2. Start with main recommendations organized under clear headings using **bold** text
3. Use bullet points (-) for individual recommendations
4. End with a disclaimer section

Keep the advice specific and actionable.`;

      // debug - verify prompt
      console.log(prompt);

      // API call and response handling
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      let text = response.text(); // returns a string
      return {
        advice: text,
      };
      // }
    } catch (error) {
      console.error("Error generating health advice:", error);
      throw new Error("Failed to generate health advice");
    }
  }
}

export function useHealthAdvice() {
  const { user } = useAuth();

  const getAdvice = async (concernOrGoal: string) => {
    const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_AI_API_KEY;
    if (!API_KEY) {
      throw new Error("API key is missing");
    }
    const advisor = new HealthAdvisor(API_KEY);

    try {
      const advice = await advisor.generateAdvice(
        {
          name: user?.name,
          age: user?.age,
          weight: user?.weight,
          height: user?.height,
          experience: user?.experience,
          strength: user?.strength,
          endurance: user?.endurance,
          weightLoss: user?.weightLoss,
          health: user?.health,
          gender: user?.gender,
          hoursAvailable: user?.hoursAvailable,
        },
        concernOrGoal
      );

      return advice;
    } catch (error) {
      console.error("Error getting health advice:", error);
      throw error;
    }
  };

  return { getAdvice };
}
