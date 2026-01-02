
export enum ToneType {
  GENTLE = '溫柔婉轉',
  PROFESSIONAL = '專業正式',
  ENCOURAGING = '正向鼓勵',
  FIRM = '堅定明確'
}

export enum PlatformType {
  CONTACT_BOOK = '聯絡簿',
  LINE = 'LINE/通訊軟體',
  EMAIL = '電子郵件'
}

export interface RefinedMessage {
  id: string;
  original: string;
  refined: string;
  tone: ToneType;
  platform: PlatformType;
  timestamp: number;
}

export interface ChallengeScenario {
  id: string;
  title: string;
  situation: string;
  parentResponse: string;
}
