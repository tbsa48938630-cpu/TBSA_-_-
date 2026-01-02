
import { GoogleGenAI, Type } from "@google/genai";
import { ToneType, PlatformType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const refineMessage = async (
  rawText: string, 
  tone: ToneType, 
  platform: PlatformType
): Promise<string> => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    你是一位資深的國小班導師，擅長親師溝通，極具同理心且專業。
    
    請將老師輸入的原始訊息（可能包含情緒、抱怨或直白的陳述）轉化為適合在「${platform}」傳送的內容。
    語氣要求：${tone}。
    
    原始訊息：
    "${rawText}"
    
    潤飾原則：
    1. 保持專業，不要流於情緒。
    2. 專注於孩子的成長與問題解決，而非指責。
    3. 加入適當的關懷語句。
    4. 確保資訊準確傳達。
    5. 不要隨意假設家長的教養失敗，改以「共同合作」的角度出發。
    
    請直接提供潤飾後的文字，不需要額外的解釋。
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text || "抱歉，潤飾過程中發生錯誤。";
  } catch (error) {
    console.error("Refinement error:", error);
    return "連線失敗，請檢查網路或稍後再試。";
  }
};

export const generateChallenge = async (): Promise<{ title: string; situation: string; parentReply: string }> => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    請隨機生成一個具備挑戰性的「親師溝通難題情境」。
    
    格式：JSON
    {
      "title": "情境標題（短）",
      "situation": "發生了什麼事（例如：孩子在學校霸凌他人、成績突然大幅滑落、家長過度干預教學等）",
      "parentReply": "家長目前不客氣的回覆或態度"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            situation: { type: Type.STRING },
            parentReply: { type: Type.STRING }
          },
          required: ["title", "situation", "parentReply"]
        }
      }
    });
    
    return JSON.parse(response.text);
  } catch (error) {
    return {
      title: "小華的作業問題",
      situation: "小華連續一週未交作業，且在課堂上睡覺。",
      parentReply: "老師，我們在家都有叫他寫，是不是學校作業太多了？"
    };
  }
};
