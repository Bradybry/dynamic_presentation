export interface MessageStats {
    partnerMessages: number;
    userMessages: number;
    partnerPercentage: number;
    userPercentage: number;
  }
  
  export interface ConversationStats {
    partnerInitiated: number;
    userInitiated: number;
  }
  
  export interface WordStats {
    totalWords: number;
    comparisonBook: {
      name: string;
      wordCount: number;
    };
  }
  
  export interface MessageLengthStats {
    partner: {
      wordsPerMessage: number;
      charactersPerMessage: number;
    };
    user: {
      wordsPerMessage: number;
      charactersPerMessage: number;
    };
  }
  
  export interface ResponseTimeData {
    time: string;
    Madison: number;
    Bryce: number;
  }
  
  export interface ResponseTimeStats {
    partnerMedianResponse: number;
    userMedianResponse: number;
  }
  
  export interface MessageContentStats {
    emojiPercentage: number;
    questionPercentage: number;
    exclamationPercentage: number;
    mostUsedEmoji: string;
    mostUsedEmojiCount: number;
  }
  
  export interface DatingStats {
    totalMessages: number;
    totalDays: number;
    partnerName: string;
    userName: string;
    messageStats: MessageStats;
    conversationStats: ConversationStats;
    wordStats: WordStats;
    messageLengthStats: MessageLengthStats;
    responseTimeData: ResponseTimeData[];
    responseTimeStats: ResponseTimeStats;
    messageContentStats: {
      partner: MessageContentStats;
      user: MessageContentStats;
    };
  }