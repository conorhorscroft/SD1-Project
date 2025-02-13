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
      model: "gemini-pro",
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
  ${bmi ? `- BMI: ${bmi}` : ""}
  ${
    user.experience
      ? `- Fitness Experience Level out of 10: ${user.experience}`
      : ""
  }

  They are seeking advice about: ${concernOrGoal}

 Please provide your response in markdown format with the following structure:
1. Start with main recommendations organized under clear headings using **bold** text
2. Use bullet points (-) for individual recommendations
3. End with a disclaimer section

Keep the advice specific and actionable.`;

      // debug - verify prompt
      console.log(prompt);

      // API call and response handling
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      let text = response.text(); // returns a string formatted like JSON
      // text = text
      //   .replace(/^```json/, "")
      //   .replace(/```$/, "")
      //   .trim();
      // console.log("Text prior to parsing: ", text);

      // // Parse the JSON response
      // try {
      //   const jsonResponse = JSON.parse(text);
      //   console.log("JSON Response:", jsonResponse);
      //   return {
      //     advice: jsonResponse.advice,
      //     disclaimer: jsonResponse.disclaimer,
      //   };
      // } catch (parseError) {
      //   console.log("Unable to parse JSON");
      //   // If JSON parsing fails, return the raw text with a default disclaimer
      return {
        advice:
          text +
          "\n\nThis is general wellness information and not medical advice. Always consult healthcare professionals for medical concerns.",
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
