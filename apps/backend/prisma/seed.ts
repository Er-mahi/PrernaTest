import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('ðŸŒ± Starting seed process...');

  // Create sample test with correct field names based on your schema
  const test = await prisma.test.create({
    data: {
      title: 'Rajasthan 4th Grade Full Test - 1',
      description: `यह व्यापक परीक्षा राजस्थान चतुर्थ श्रेणी परीक्षा के सभी विषयों को शामिल करते हुए 4 खंडों में विभाजित है।
                    This comprehensive test contains 4 sections covering all subjects of the Rajasthan 4th Grade examination.`,
      duration: 120,
      totalMarks: 120,
      negativeMarking: true,
      negativeMarks: 0.33,
      instructions: "",
      status: 'PUBLISHED',
      isFree: true,
      sections: {
        create: [
          {
            title: 'राजस्थान चतुर्थ श्रेणी कर्मचारी संपूर्ण परीक्षा - 1',
            description: `यह व्यापक परीक्षा राजस्थान चतुर्थ श्रेणी परीक्षा के सभी विषयों को शामिल करते हुए 4 खंडों में विभाजित है।
                          This comprehensive test contains 4 sections covering all subjects of the Rajasthan 4th Grade examination.`,
            order: 1,
            questions: { // This matches your schema: questions: SectionQuestion[]
              create: [
                {
    order: 1,
    marks: 1,
    question: {
      create: {
        content: "निम्नलिखित में से किस शब्द में संधि है?",
        difficulty: "EASY",
        marks: 1,
        explanation: "संधि दो शब्दों के मेल से बनती है।",
        options: {
          create: [
            { content: "परिचय", isCorrect: false, order: 1 },
            { content: "लोकप्रिय", isCorrect: false, order: 2 },
            { content: "रामेश्वर", isCorrect: true, order: 3 },
            { content: "सुधारना", isCorrect: false, order: 4 }
          ]
        }
      }
    }
  },
  {
    order: 2,
    marks: 1,
    question: {
      create: {
        content: "‘अस्पताल’ शब्द में कौन-सा उपसर्ग है?",
        difficulty: "EASY",
        marks: 1,
        explanation: "‘अ’ उपसर्ग व तद्भव है।",
        options: {
          create: [
            { content: "प्र", isCorrect: false, order: 1 },
            { content: "नि", isCorrect: false, order: 2 },
            { content: "अ", isCorrect: true, order: 3 },
            { content: "सु", isCorrect: false, order: 4 }
          ]
        }
      }
    }
  },
  {
    order: 3,
    marks: 1,
    question: {
      create: {
        content: "‘शब्दार्थ’ किस प्रकार की संधि है?",
        difficulty: "EASY",
        marks: 1,
        explanation: "यह द्वंद्व समास है।",
        options: {
          create: [
            { content: "यण संधि", isCorrect: false, order: 1 },
            { content: "दीर्घ संधि", isCorrect: false, order: 2 },
            { content: "गुण संधि", isCorrect: true, order: 3 },
            { content: "वृद्धि संधि", isCorrect: false, order: 4 }
          ]
        }
      }
    }
  },
  {
    order: 4,
    marks: 1,
    question: {
      create: {
        content: "निर्दिष्ट वाक्य के लिए एक शब्द: ‘जो सब जगह हो’",
        difficulty: "EASY",
        marks: 1,
        explanation: "‘व्यापक’ उस शब्द का उत्तर है।",
        options: {
          create: [
            { content: "दृढ़", isCorrect: false, order: 1 },
            { content: "व्यापक", isCorrect: true, order: 2 },
            { content: "विशाल", isCorrect: false, order: 3 },
            { content: "समान", isCorrect: false, order: 4 }
          ]
        }
      }
    }
  },
  {
    order: 5,
    marks: 1,
    question: {
      create: {
        content: "‘घर’ शब्द का विलोम है –",
        difficulty: "EASY",
        marks: 1,
        explanation: "‘घर’ का विलोम है ‘जंगल’।",
        options: {
          create: [
            { content: "जंगल", isCorrect: true, order: 1 },
            { content: "खेत", isCorrect: false, order: 2 },
            { content: "पानी", isCorrect: false, order: 3 },
            { content: "बाजार", isCorrect: false, order: 4 }
          ]
        }
      }
    }
  },
  {
    order: 6,
    marks: 1,
    question: {
      create: {
        content: "‘विद्यार्थी’ में कौन-सा प्रत्यय है?",
        difficulty: "EASY",
        marks: 1,
        explanation: "‘अर्थी’ प्रत्यय है।",
        options: {
          create: [
            { content: "अर्थी", isCorrect: true, order: 1 },
            { content: "ता", isCorrect: false, order: 2 },
            { content: "पन", isCorrect: false, order: 3 },
            { content: "आन", isCorrect: false, order: 4 }
          ]
        }
      }
    }
  },
  {
    order: 7,
    marks: 1,
    question: {
      create: {
        content: "‘गुरु’ शब्द का पर्यायवाची है?",
        difficulty: "EASY",
        marks: 1,
        explanation: "‘आचार्य’ भी साधारण पर्याय है।",
        options: {
          create: [
            { content: "द्रोण", isCorrect: false, order: 1 },
            { content: "आचार्य", isCorrect: true, order: 2 },
            { content: "विद्ध", isCorrect: false, order: 3 },
            { content: "संत", isCorrect: false, order: 4 }
          ]
        }
      }
    }
  },
  {
    order: 8,
    marks: 1,
    question: {
      create: {
        content: "‘सब्जी’ शब्द का तत्सम रूप क्या है?",
        difficulty: "EASY",
        marks: 1,
        explanation: "तत्सम है ‘शाक’",
        options: {
          create: [
            { content: "शाक", isCorrect: true, order: 1 },
            { content: "तरकारी", isCorrect: false, order: 2 },
            { content: "कंद", isCorrect: false, order: 3 },
            { content: "फल", isCorrect: false, order: 4 }
          ]
        }
      }
    }
  },
  {
    order: 9,
    marks: 1,
    question: {
      create: {
        content: "‘मित्र’ का तद्भव रूप है –",
        difficulty: "EASY",
        marks: 1,
        explanation: "‘मित्तर’ प्रचलित तद्भव है।",
        options: {
          create: [
            { content: "मित्तर", isCorrect: true, order: 1 },
            { content: "बन्धु", isCorrect: false, order: 2 },
            { content: "अमित्र", isCorrect: false, order: 3 },
            { content: "दोस्त", isCorrect: false, order: 4 }
          ]
        }
      }
    }
  },
  {
    order: 10,
    marks: 1,
    question: {
      create: {
        content: "‘तत्काल’ शब्द का सही वाक्य शुद्ध रूप क्या है?",
        difficulty: "EASY",
        marks: 1,
        explanation: "शुद्ध: तत्काल उपाय करें।",
        options: {
          create: [
            { content: "तत्काल उपाय करें।", isCorrect: true, order: 1 },
            { content: "तत्काल में उपाय करो।", isCorrect: false, order: 2 },
            { content: "तत्कालीन उपाय किये।", isCorrect: false, order: 3 },
            { content: "तत्काल उपाय करने।", isCorrect: false, order: 4 }
          ]
        }
      }
    }
  },
  {
    order: 11,
    marks: 1,
    question: {
      create: {
        content: "‘आवश्यक’ का विलोम है –",
        difficulty: "EASY",
        marks: 1,
        explanation: "‘अनावश्यक’ विलोम है।",
        options: {
          create: [
            { content: "अनावश्यक", isCorrect: true, order: 1 },
            { content: "प्रचुर", isCorrect: false, order: 2 },
            { content: "निरर्थक", isCorrect: false, order: 3 },
            { content: "निजी", isCorrect: false, order: 4 }
          ]
        }
      }
    }
  },
  {
    order: 12,
    marks: 1,
    question: {
      create: {
        content: "सरदार’ शब्द में कौन सा सर्वनाम है?",
        difficulty: "EASY",
        marks: 1,
        explanation: "यह कोई सर्वनाम नहीं है।",
        options: {
          create: [
            { content: "निजवाचक", isCorrect: false, order: 1 },
            { content: "पुरुषवाचक", isCorrect: false, order: 2 },
            { content: "अनिश्चयवाचक", isCorrect: false, order: 3 },
            { content: "सर्वनाम नहीं है", isCorrect: true, order: 4 }
          ]
        }
      }
    }
  },
  {
    order: 13,
    marks: 1,
    question: {
      create: {
        content: "‘अंग्रेज़ी’ का पर्यायवाची है –",
        difficulty: "EASY",
        marks: 1,
        explanation: "अंग्रेज़ी = इंग्लिश",
        options: {
          create: [
            { content: "इंग्लिश", isCorrect: true, order: 1 },
            { content: "फ्रेंच", isCorrect: false, order: 2 },
            { content: "यूनानी", isCorrect: false, order: 3 },
            { content: "रूसी", isCorrect: false, order: 4 }
          ]
        }
      }
    }
  },
  {
    order: 14,
    marks: 1,
    question: {
      create: {
        content: "‘शब्द’ का विलोम क्या है?",
        difficulty: "EASY",
        marks: 1,
        explanation: "‘शब्द’ का विलोम ‘नाद’ नहीं, ‘अर्थ’ नहीं बल्कि ‘मौन’ है।",
        options: {
          create: [
            { content: "मौन", isCorrect: true, order: 1 },
            { content: "अर्थ", isCorrect: false, order: 2 },
            { content: "नाद", isCorrect: false, order: 3 },
            { content: "वाणी", isCorrect: false, order: 4 }
          ]
        }
      }
    }
  },
  {
    order: 15,
    marks: 1,
    question: {
      create: {
        content: "'जीवन’ का पर्यायवाची क्या है?",
        difficulty: "EASY",
        marks: 1,
        explanation: "‘प्राण’ पर्याय है।",
        options: {
          create: [
            { content: "प्राण", isCorrect: true, order: 1 },
            { content: "मृत्यु", isCorrect: false, order: 2 },
            { content: "जल", isCorrect: false, order: 3 },
            { content: "स्वास्थ्य", isCorrect: false, order: 4 }
          ]
        }
      }
    }
  },
  {
    order: 16,
    marks: 1,
    question: {
      create: {
        content: "‘सफलता’ का सही वाक्य प्रयोग क्या है?",
        difficulty: "EASY",
        marks: 1,
        explanation: "सही: सफलता पर गर्व हुआ।",
        options: {
          create: [
            { content: "सफलता पर गर्व हुआ।", isCorrect: true, order: 1 },
            { content: "सफलता पर गर्व हुई।", isCorrect: false, order: 2 },
            { content: "सफलता हुई गर्व।", isCorrect: false, order: 3 },
            { content: "गर्व सफलता हुई।", isCorrect: false, order: 4 }
          ]
        }
      }
    }
  },
  {
    order: 17,
    marks: 1,
    question: {
      create: {
        content: "‘नम्र’ का विलोम शब्द क्या है?",
        difficulty: "EASY",
        marks: 1,
        explanation: "अभिमानी विलोम है।",
        options: {
          create: [
            { content: "अभिमानी", isCorrect: true, order: 1 },
            { content: "मुलायम", isCorrect: false, order: 2 },
            { content: "धैर्य", isCorrect: false, order: 3 },
            { content: "मित्र", isCorrect: false, order: 4 }
          ]
        }
      }
    }
  },
  {
    order: 18,
    marks: 1,
    question: {
      create: {
        content: "‘माता’ का तद्भव रूप क्या है?",
        difficulty: "EASY",
        marks: 1,
        explanation: "‘माई’ प्रचलित तद्भव है।",
        options: {
          create: [
            { content: "माई", isCorrect: true, order: 1 },
            { content: "मातृ", isCorrect: false, order: 2 },
            { content: "माँ", isCorrect: false, order: 3 },
            { content: "मातेश्वरी", isCorrect: false, order: 4 }
          ]
        }
      }
    }
  },
  {
    order: 19,
    marks: 1,
    question: {
      create: {
        content: "‘सर्वनाम’ कितने प्रकार के होते हैं?",
        difficulty: "EASY",
        marks: 1,
        explanation: "6 प्रकार होते हैं।",
        options: {
          create: [
            { content: "6", isCorrect: true, order: 1 },
            { content: "4", isCorrect: false, order: 2 },
            { content: "5", isCorrect: false, order: 3 },
            { content: "7", isCorrect: false, order: 4 }
          ]
        }
      }
    }
  },
  {
    order: 20,
    marks: 1,
    question: {
      create: {
        content: "‘आज्ञपत्र’ किसका उदाहरण है?",
        difficulty: "EASY",
        marks: 1,
        explanation: "यह कार्यालयी पत्र है।",
        options: {
          create: [
            { content: "कार्यालयी पत्र", isCorrect: true, order: 1 },
            { content: "व्यक्तिगत पत्र", isCorrect: false, order: 2 },
            { content: "साहित्यिक पत्र", isCorrect: false, order: 3 },
            { content: "समान्य पत्र", isCorrect: false, order: 4 }
          ]
        }
      }
    }
  },
  {
  order: 21,
  marks: 1,
  question: {
    create: {
      content: "My Friend and his father ______ meeting us tomorrow.",
      difficulty: "EASY",
      marks: 1,
      explanation: "When two subjects are connected by 'and', we use plural verb 'are'.",
      options: {
        create: [
          { content: "are", isCorrect: true, order: 1 },
          { content: "is", isCorrect: false, order: 2 },
          { content: "will", isCorrect: false, order: 3 },
          { content: "have", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 22,
  marks: 1,
  question: {
    create: {
      content: "Which of the Following is correct?",
      difficulty: "EASY",
      marks: 1,
      explanation: "We use 'succeed in' when talking about succeeding in work or tasks.",
      options: {
        create: [
          { content: "I hope he'll succeed at his work", isCorrect: false, order: 1 },
          { content: "I hope he'll succeed on his work", isCorrect: false, order: 2 },
          { content: "I hope he'll succeed in his work", isCorrect: true, order: 3 },
          { content: "hope he'll succeed for his work", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 23,
  marks: 1,
  question: {
    create: {
      content: "Change into Direct Narration: \"She asked me how long I had worked there.\"",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "In direct narration, past perfect becomes present perfect and 'there' becomes 'here'. The correct answer would be 'She said to me, \"How long have you worked here?\"'",
      options: {
        create: [
          { content: "She said \"How your worked there\"?", isCorrect: false, order: 1 },
          { content: "She said \"How long have you working here\"?", isCorrect: false, order: 2 },
          { content: "She said \"How long have he working here\"?", isCorrect: false, order: 3 },
          { content: "She said me \"How long have worked here\"?", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 24,
  marks: 1,
  question: {
    create: {
      content: "She said \"You may need my help.\" (Indirect Narration)",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "In indirect narration, 'may' changes to 'might', 'you' to 'I', and 'my' to 'her'.",
      options: {
        create: [
          { content: "She told that I may need my help.", isCorrect: false, order: 1 },
          { content: "She told that I must need her help.", isCorrect: false, order: 2 },
          { content: "She told that I might need help.", isCorrect: false, order: 3 },
          { content: "She told me (that) I might need her help.", isCorrect: true, order: 4 }
        ]
      }
    }
  }
},
{
  order: 25,
  marks: 1,
  question: {
    create: {
      content: "I bought this shirt ______ Rs. 200.",
      difficulty: "EASY",
      marks: 1,
      explanation: "We use 'for' with price when buying something.",
      options: {
        create: [
          { content: "for", isCorrect: true, order: 1 },
          { content: "in", isCorrect: false, order: 2 },
          { content: "with", isCorrect: false, order: 3 },
          { content: "of", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 26,
  marks: 1,
  question: {
    create: {
      content: "Don't walk ____the railway line.",
      difficulty: "EASY",
      marks: 1,
      explanation: "We use 'across' when moving from one side to the other side of something.",
      options: {
        create: [
          { content: "among", isCorrect: false, order: 1 },
          { content: "out", isCorrect: false, order: 2 },
          { content: "of", isCorrect: false, order: 3 },
          { content: "across", isCorrect: true, order: 4 }
        ]
      }
    }
  }
},
{
  order: 27,
  marks: 1,
  question: {
    create: {
      content: "Choose the correct alternative in reported speech: He said to his officer, \"Let me go home.\"",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "When reporting a request using 'Let me', we use 'requested' and 'to let him'.",
      options: {
        create: [
          { content: "He asked his officer if he can go home.", isCorrect: false, order: 1 },
          { content: "He requested his officer to let him go home.", isCorrect: true, order: 2 },
          { content: "He ordered his officer let me go home.", isCorrect: false, order: 3 },
          { content: "He advised his officer that he will go home.", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 28,
  marks: 1,
  question: {
    create: {
      content: "Fill in the blank with the correct article: \"He works in _____ L.I.C. of India.\"",
      difficulty: "EASY",
      marks: 1,
      explanation: "We use 'the' with organizations that have 'of' in their name.",
      options: {
        create: [
          { content: "Zero", isCorrect: false, order: 1 },
          { content: "the", isCorrect: true, order: 2 },
          { content: "a", isCorrect: false, order: 3 },
          { content: "an", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 29,
  marks: 1,
  question: {
    create: {
      content: "I have read most of Dickens's novels.",
      difficulty: "EASY",
      marks: 1,
      explanation: "'Have read' indicates Present Perfect tense.",
      options: {
        create: [
          { content: "Present Perfect", isCorrect: true, order: 1 },
          { content: "Present Simple", isCorrect: false, order: 2 },
          { content: "Past Perfect", isCorrect: false, order: 3 },
          { content: "Past Simple", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 30,
  marks: 1,
  question: {
    create: {
      content: "Kindness is ____ virtue.",
      difficulty: "EASY",
      marks: 1,
      explanation: "We use 'a' before singular countable nouns when referring to them generally.",
      options: {
        create: [
          { content: "the", isCorrect: false, order: 1 },
          { content: "a", isCorrect: true, order: 2 },
          { content: "an", isCorrect: false, order: 3 },
          { content: "no article", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 31,
  marks: 1,
  question: {
    create: {
      content: "One of my friends _____ going to America.",
      difficulty: "EASY",
      marks: 1,
      explanation: "'One of' takes singular verb 'is'.",
      options: {
        create: [
          { content: "are", isCorrect: false, order: 1 },
          { content: "is", isCorrect: true, order: 2 },
          { content: "were", isCorrect: false, order: 3 },
          { content: "have been", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 32,
  marks: 1,
  question: {
    create: {
      content: "Choose the correct sentence.",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "Past perfect 'had eaten' is used for action completed before another past action 'woke up'.",
      options: {
        create: [
          { content: "When I woke up, he has already eaten breakfast.", isCorrect: false, order: 1 },
          { content: "When I woke up, he had already eaten breakfast.", isCorrect: true, order: 2 },
          { content: "When I had woken up, he had already ate breakfast.", isCorrect: false, order: 3 },
          { content: "When I had woken up, he has already ate breakfast.", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 33,
  marks: 1,
  question: {
    create: {
      content: "I was standing outside the post Office.",
      difficulty: "EASY",
      marks: 1,
      explanation: "'Was standing' indicates Past Continuous tense.",
      options: {
        create: [
          { content: "Present Continuous", isCorrect: false, order: 1 },
          { content: "Past Continuous", isCorrect: true, order: 2 },
          { content: "Past Simple", isCorrect: false, order: 3 },
          { content: "Past Perfect", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 34,
  marks: 1,
  question: {
    create: {
      content: "\"Must you go so soon?\", said Dorothy",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "Question with 'must' becomes 'asked if he had to' in indirect speech.",
      options: {
        create: [
          { content: "I asked him go soon.", isCorrect: false, order: 1 },
          { content: "I told him he should go soon.", isCorrect: false, order: 2 },
          { content: "I told him he must not go soon.", isCorrect: false, order: 3 },
          { content: "I asked him if he had to go so soon.", isCorrect: true, order: 4 }
        ]
      }
    }
  }
},
{
  order: 35,
  marks: 1,
  question: {
    create: {
      content: "Which of the following is correct?",
      difficulty: "EASY",
      marks: 1,
      explanation: "We use 'much faster' for comparison, not 'much more faster'.",
      options: {
        create: [
          { content: "The old car moved much more faster than the new car", isCorrect: false, order: 1 },
          { content: "The old car moved more faster than the new car.", isCorrect: false, order: 2 },
          { content: "The old car moved much faster than the new car.", isCorrect: true, order: 3 },
          { content: "The old car moved much more fast than the new car.", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 36,
  marks: 1,
  question: {
    create: {
      content: "1800 ईसवी में आज के राजस्थान को राजपूताना कहने वाले प्रथम व्यक्ति थे",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "जॉर्ज थॉमस ने 1800 ईसवी में राजस्थान को राजपूताना नाम दिया था।",
      options: {
        create: [
          { content: "हैकेट", isCorrect: false, order: 1 },
          { content: "ऑलचिन", isCorrect: false, order: 2 },
          { content: "जॉर्ज थॉमस", isCorrect: true, order: 3 },
          { content: "जेम्स टॉड", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 37,
  marks: 1,
  question: {
    create: {
      content: "निम्न में से कौन सी राजस्थान में वनों के प्रशासनिक वर्गीकरण की श्रेणी नहीं है?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "राजस्थान में वनों का वर्गीकरण आरक्षित, सुरक्षित और अवर्गीकृत वन में होता है।",
      options: {
        create: [
          { content: "सुरक्षित वन", isCorrect: true, order: 1 },
          { content: "आरक्षित वन", isCorrect: false, order: 2 },
          { content: "अनारक्षित वन", isCorrect: false, order: 3 },
          { content: "अवर्गीकृत वन", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 38,
  marks: 1,
  question: {
    create: {
      content: "निम्नलिखित में से राजस्थान के कौन से शहर क्रमशः - मांड व सूर्यनगरी के नाम से जाने जाते है?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "जैसलमेर को मांड और जोधपुर को सूर्यनगरी कहते हैं।",
      options: {
        create: [
          { content: "बीकानेर, जैसलमेर", isCorrect: false, order: 1 },
          { content: "उदयपुर, अजमेर", isCorrect: false, order: 2 },
          { content: "जैसलमेर, जोधपुर", isCorrect: true, order: 3 },
          { content: "अजमेर, भीलवाडा", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 39,
  marks: 1,
  question: {
    create: {
      content: "राजस्थान भौगोलिक दृष्टि से भारत में कहाँ स्थित है?",
      difficulty: "EASY",
      marks: 1,
      explanation: "राजस्थान भारत के उत्तर-पश्चिम में स्थित है।",
      options: {
        create: [
          { content: "दक्षिण-पूर्व", isCorrect: false, order: 1 },
          { content: "दक्षिण-पश्चिम", isCorrect: false, order: 2 },
          { content: "उत्तर-पूर्व", isCorrect: false, order: 3 },
          { content: "उत्तर-पश्चिम", isCorrect: true, order: 4 }
        ]
      }
    }
  }
},
{
  order: 40,
  marks: 1,
  question: {
    create: {
      content: "निम्नलिखित में से कौन-सा राज्य राजस्थान के साथ अपनी सीमा को साझा नहीं करता?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "महाराष्ट्र राजस्थान के साथ सीमा साझा नहीं करता।",
      options: {
        create: [
          { content: "उत्तरप्रदेश", isCorrect: false, order: 1 },
          { content: "महाराष्ट्र", isCorrect: true, order: 2 },
          { content: "पंजाब", isCorrect: false, order: 3 },
          { content: "हरियाणा", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 41,
  marks: 1,
  question: {
    create: {
      content: "राजस्थान का वह जिला, जिसकी सीमा भारत-पाकिस्तान अन्तर्राष्ट्रीय सीमा से नहीं मिलती है, वह है-",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "जोधपुर की सीमा भारत-पाकिस्तान अंतर्राष्ट्रीय सीमा से नहीं मिलती।",
      options: {
        create: [
          { content: "गंगानगर", isCorrect: false, order: 1 },
          { content: "जैसलमेर", isCorrect: false, order: 2 },
          { content: "जोधपुर", isCorrect: true, order: 3 },
          { content: "बाड़मेर", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 42,
  marks: 1,
  question: {
    create: {
      content: "राजस्थान में संभागीय आयुक्त व्यवस्था को कब पुनर्जीवित किया गया?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "राजस्थान में संभागीय आयुक्त व्यवस्था को 1987 में पुनर्जीवित किया गया।",
      options: {
        create: [
          { content: "1977", isCorrect: false, order: 1 },
          { content: "1985", isCorrect: false, order: 2 },
          { content: "1987", isCorrect: true, order: 3 },
          { content: "1989", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 43,
  marks: 1,
  question: {
    create: {
      content: "रेडक्लिफ रेखा का राजस्थान में विस्तार है:",
      difficulty: "HARD",
      marks: 1,
      explanation: "रेडक्लिफ रेखा का विस्तार हिन्दुमलकोट (गंगानगर) से शाहगढ़ (जालौर) तक है।",
      options: {
        create: [
          { content: "हिन्दुमलकोट (गंगानगर) से बाखासर (बाड़मेर) तक", isCorrect: false, order: 1 },
          { content: "कोणागांव (गंगानगर) से शाहगढ़ (जालौर) तक", isCorrect: false, order: 2 },
          { content: "हिन्दुमलकोट (गंगानगर) से शाहगढ़ (जालौर) तक", isCorrect: true, order: 3 },
          { content: "कोणागांव (गंगानगर) से बाखासर (बाड़मेर) तक", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 44,
  marks: 1,
  question: {
    create: {
      content: "राजस्थान का राज्य वृक्ष है",
      difficulty: "EASY",
      marks: 1,
      explanation: "खेजड़ी राजस्थान का राज्य वृक्ष है।",
      options: {
        create: [
          { content: "खेजड़ी", isCorrect: true, order: 1 },
          { content: "रोहिड़ा", isCorrect: false, order: 2 },
          { content: "पीपल", isCorrect: false, order: 3 },
          { content: "नीम", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 45,
  marks: 1,
  question: {
    create: {
      content: "'बाघ परियोजना' अभियान का आरंभ हुआ था",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "बाघ परियोजना का आरंभ 1973 में हुआ था।",
      options: {
        create: [
          { content: "1981", isCorrect: false, order: 1 },
          { content: "1973", isCorrect: true, order: 2 },
          { content: "1983", isCorrect: false, order: 3 },
          { content: "1971", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 46,
  marks: 1,
  question: {
    create: {
      content: "केसरसिंह बारहठ ने स्थापित की?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "केसरसिंह बारहठ ने राजस्थान में वीर भारत सभा की स्थापना की थी।",
      options: {
        create: [
          { content: "नगर सभा", isCorrect: false, order: 1 },
          { content: "वीर भारत सभा", isCorrect: true, order: 2 },
          { content: "ग्राम सभा", isCorrect: false, order: 3 },
          { content: "बाल सभा", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 47,
  marks: 1,
  question: {
    create: {
      content: "निम्नलिखित में से कौनसा दुर्ग कोशवर्द्धन दुर्ग के नाम से भी जाना जाता हैं?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "शेरगढ़ दुर्ग को कोशवर्द्धन दुर्ग के नाम से भी जाना जाता है।",
      options: {
        create: [
          { content: "अलवर का बाला दुग", isCorrect: false, order: 1 },
          { content: "शेरगढ़ दुर्ग", isCorrect: true, order: 2 },
          { content: "तवनगढ़ दुर्ग", isCorrect: false, order: 3 },
          { content: "सिवाना दुर्ग", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 48,
  marks: 1,
  question: {
    create: {
      content: "भारतीय संविधान के अनुसार राजस्थान को भारत के किस श्रेणी के राज्य में रखा गया हैं?",
      difficulty: "EASY",
      marks: 1,
      explanation: "भारतीय संविधान के अनुसार राजस्थान को प्रथम श्रेणी के राज्य में रखा गया है।",
      options: {
        create: [
          { content: "प्रथम श्रेणी", isCorrect: true, order: 1 },
          { content: "द्वितीय श्रेणी", isCorrect: false, order: 2 },
          { content: "तृतीय श्रेणी", isCorrect: false, order: 3 },
          { content: "स्वतंत्र राज्य", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 49,
  marks: 1,
  question: {
    create: {
      content: "एक पत्थर को गर्म करने पर उसका रंग लाल हो जाता है, फिर वह ठंडा होने पर सामान्य हो जाता है। यह किस प्रकार का परिवर्तन है?",
      difficulty: "EASY",
      marks: 1,
      explanation: "यह भौतिक परिवर्तन है क्योंकि यह अस्थायी और प्रतिवर्ती है।",
      options: {
        create: [
          { content: "रासायनिक परिवर्तन", isCorrect: false, order: 1 },
          { content: "स्थायी परिवर्तन", isCorrect: false, order: 2 },
          { content: "भौतिक परिवर्तन", isCorrect: true, order: 3 },
          { content: "ऊष्मीय अपघटन", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 50,
  marks: 1,
  question: {
    create: {
      content: "राजस्थान के निम्नलिखित में से कौन से संवैधानिक पदाधिकारी राज्यपाल द्वारा नियुक्त किए जाते हैं लेकिन उन्हें राज्यपाल द्वारा उनके पद से नहीं हटाया जा सकता है-",
      difficulty: "HARD",
      marks: 1,
      explanation: "राज्य निर्वाचन आयुक्त को राज्यपाल नियुक्त करता है लेकिन हटा नहीं सकता।",
      options: {
        create: [
          { content: "महाधिवक्ता", isCorrect: false, order: 1 },
          { content: "राज्य निर्वाचन आयुक्त", isCorrect: true, order: 2 },
          { content: "राजस्थान लोक सेवा आयोग के सदस्य", isCorrect: false, order: 3 },
          { content: "1 और 2", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 51,
  marks: 1,
  question: {
    create: {
      content: "निम्नलिखित में से राजस्थान की सबसे लम्बी नदी कौन सी हैं?",
      difficulty: "EASY",
      marks: 1,
      explanation: "चंबल राजस्थान की सबसे लंबी नदी है।",
      options: {
        create: [
          { content: "चंबल", isCorrect: true, order: 1 },
          { content: "लूनी", isCorrect: false, order: 2 },
          { content: "साबरमती", isCorrect: false, order: 3 },
          { content: "खारी", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 52,
  marks: 1,
  question: {
    create: {
      content: "निम्नलिखित में से किसको राजस्थान का मेनचेस्टर कहा जाता है?",
      difficulty: "EASY",
      marks: 1,
      explanation: "भीलवाड़ा को राजस्थान का मेनचेस्टर कहा जाता है।",
      options: {
        create: [
          { content: "जयपुर", isCorrect: false, order: 1 },
          { content: "भीलवाड़ा", isCorrect: true, order: 2 },
          { content: "नागौर", isCorrect: false, order: 3 },
          { content: "ब्यावर", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 53,
  marks: 1,
  question: {
    create: {
      content: "निम्नलिखित में से राजस्थान का सबसे बड़ा भौगोलिक क्षेत्र (क्षेत्रफल के अनुसार) कौन सा है?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "पश्चिमी मरूस्थलीय मैदानी क्षेत्र राजस्थान का सबसे बड़ा भौगोलिक क्षेत्र है।",
      options: {
        create: [
          { content: "अर्ध शुष्क क्षेत्र", isCorrect: false, order: 1 },
          { content: "अरावली क्षेत्र", isCorrect: false, order: 2 },
          { content: "पश्चिमी मरूंस्थलीय मैदानी क्षेत्र", isCorrect: true, order: 3 },
          { content: "पूर्वी मैदानी क्षेत्र", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 54,
  marks: 1,
  question: {
    create: {
      content: "निम्न बेसिनों में से कौन सा गोडवार प्रदेश के नाम से जाना जाता है?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "मध्य माही बेसिन को गोडवार प्रदेश के नाम से जाना जाता है।",
      options: {
        create: [
          { content: "चम्बल बेसिन", isCorrect: false, order: 1 },
          { content: "मध्य माही बेसिन", isCorrect: true, order: 2 },
          { content: "लुनी बेसिन", isCorrect: false, order: 3 },
          { content: "सांभर बेसिन", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 55,
  marks: 1,
  question: {
    create: {
      content: "चन्द्राकार बालुका स्तुपों को कहा जाता है",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "चन्द्राकार बालुका स्तुपों को बरखान कहा जाता है।",
      options: {
        create: [
          { content: "सीफ", isCorrect: false, order: 1 },
          { content: "बरखान", isCorrect: true, order: 2 },
          { content: "लुनेट", isCorrect: false, order: 3 },
          { content: "शब्र-काफीज", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 56,
  marks: 1,
  question: {
    create: {
      content: "राजस्थान के किन क्षेत्रों में अनुप्रस्थ बालुकास्तूप मिलते है?",
      difficulty: "HARD",
      marks: 1,
      explanation: "गंगानगर जिले के सूरतगढ़ क्षेत्र में अनुप्रस्थ बालुकास्तूप मिलते हैं।",
      options: {
        create: [
          { content: "बीकानेर जिले के पुंगल के चारों और", isCorrect: false, order: 1 },
          { content: "गंगानगर जिले का सूरतगढ़ क्षेत्र", isCorrect: true, order: 2 },
          { content: "जैसलमेर जिले का मोहनगढ़ क्षेत्र", isCorrect: false, order: 3 },
          { content: "हनुमानगढ़ जिले का नोहर क्षेत्र", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 57,
  marks: 1,
  question: {
    create: {
      content: "निम्नलिखित में से कौन सा एक कथन राजस्थान में काली मृदा के संदर्भ में सही नहीं है?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "काली मृदा में नाइट्रोजन की कमी होती है, पर्याप्त मात्रा में नहीं होता।",
      options: {
        create: [
          { content: "यह मृदा कोटा, बूंदी और बारां क्षेत्र में पाई जाती है।", isCorrect: false, order: 1 },
          { content: "यह मृदा चावल, गन्ना एवं सोयाबीन फसलों के लिए उपजाऊ होती है।", isCorrect: false, order: 2 },
          { content: "यह चीका प्रधान मृदा है।", isCorrect: false, order: 3 },
          { content: "इसमें पर्याप्त मात्रा में नाइट्रोजन उपस्थित होता है।", isCorrect: true, order: 4 }
        ]
      }
    }
  }
},
{
  order: 58,
  marks: 1,
  question: {
    create: {
      content: "राजस्थान में जवाई बांध कहां स्थित है?",
      difficulty: "EASY",
      marks: 1,
      explanation: "जवाई बांध पाली में स्थित है।",
      options: {
        create: [
          { content: "कोटा", isCorrect: false, order: 1 },
          { content: "सीकर", isCorrect: false, order: 2 },
          { content: "पाली", isCorrect: true, order: 3 },
          { content: "जयपुर", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 59,
  marks: 1,
  question: {
    create: {
      content: "राजस्थान में किस पेड़ को 'जंगल की आग / ज्वाला' कहते हैं?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "पलाश को 'जंगल की आग' या 'ज्वाला' कहते हैं क्योंकि इसके फूल आग की तरह लाल होते हैं।",
      options: {
        create: [
          { content: "महुआ", isCorrect: false, order: 1 },
          { content: "खेजड़ी", isCorrect: false, order: 2 },
          { content: "पलाश", isCorrect: true, order: 3 },
          { content: "धोकड़ा", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 60,
  marks: 1,
  question: {
    create: {
      content: "निम्न में से कौनसा स्थान 1857 की क्रांति का केन्द्र नहीं था?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "जयपुर 1857 की क्रांति का केंद्र नहीं था।",
      options: {
        create: [
          { content: "जयपुर", isCorrect: true, order: 1 },
          { content: "आउवा", isCorrect: false, order: 2 },
          { content: "नीमच", isCorrect: false, order: 3 },
          { content: "अजमेर", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 61,
  marks: 1,
  question: {
    create: {
      content: "\"घड़ियाल\" के संरक्षण के लिए राजस्थान राज्य में कौन-सा अभयारण्य स्थापित किया गया है?",
      difficulty: "EASY",
      marks: 1,
      explanation: "चम्बल अभयारण्य घड़ियाल के संरक्षण के लिए स्थापित किया गया है।",
      options: {
        create: [
          { content: "जयसमन्द अभयारण्य", isCorrect: false, order: 1 },
          { content: "नाहरगढ़ अभयारण्य", isCorrect: false, order: 2 },
          { content: "चम्बल अभयारण्य", isCorrect: true, order: 3 },
          { content: "मुकंदरा पहाड़ियां अभयारण्य", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 62,
  marks: 1,
  question: {
    create: {
      content: "सुनामी एक प्राकृतिक आपदा हैं, सुनामी की उत्पत्ति का सम्बंध है",
      difficulty: "EASY",
      marks: 1,
      explanation: "सुनामी की उत्पत्ति भूकम्प से होती है।",
      options: {
        create: [
          { content: "भूकम्प से", isCorrect: true, order: 1 },
          { content: "ज्वालामुखी से", isCorrect: false, order: 2 },
          { content: "भूस्खलन से", isCorrect: false, order: 3 },
          { content: "बाढ़ से", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 63,
  marks: 1,
  question: {
    create: {
      content: "राजस्थान एकीकरण के विभिन्न चरणों एवं तत्सबंधी तिथियों का निम्न में से असंगत युग्म कौन सा हैं?",
      difficulty: "HARD",
      marks: 1,
      explanation: "तृतीय चरण 18 अप्रैल 1948 को हुआ था, 25 मार्च 1949 को नहीं।",
      options: {
        create: [
          { content: "पंचम चरण - 15 मई 1949", isCorrect: false, order: 1 },
          { content: "द्वितीय चरण - 25 मार्च 1948", isCorrect: false, order: 2 },
          { content: "तृतीय चरण - 25 मार्च 1949", isCorrect: true, order: 3 },
          { content: "चतुर्थ चरण - 30 मार्च 1949", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 64,
  marks: 1,
  question: {
    create: {
      content: "स्टील किसका मिश्रण होता है?",
      difficulty: "EASY",
      marks: 1,
      explanation: "स्टील लोहा और कार्बन का मिश्रण होता है।",
      options: {
        create: [
          { content: "लोहा और कार्बन", isCorrect: true, order: 1 },
          { content: "तांबा और टिन", isCorrect: false, order: 2 },
          { content: "लोहा और जिंक", isCorrect: false, order: 3 },
          { content: "जिंक और कार्बन", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 65,
  marks: 1,
  question: {
    create: {
      content: "भारत की स्वतंत्रता के तुरंत बाद राजस्थान के पहले मुख्यमंत्री कौन थे-",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "हीरालाल शास्त्री राजस्थान के पहले मुख्यमंत्री थे।",
      options: {
        create: [
          { content: "मोहन लाल सुखाड़िया", isCorrect: false, order: 1 },
          { content: "हीरालाल शास्त्री", isCorrect: true, order: 2 },
          { content: "जय नारायण व्यास", isCorrect: false, order: 3 },
          { content: "बरकतुल्ला खान", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 66,
  marks: 1,
  question: {
    create: {
      content: "राजस्थान में निम्न में से कौनसा सिंचाई स्त्रोत, कुल सिंचित क्षेत्र में सर्वाधिक योगदान रखता है?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "कुएं एवं नलकूप राजस्थान में सिंचाई का सबसे बड़ा स्रोत है।",
      options: {
        create: [
          { content: "नहरें", isCorrect: false, order: 1 },
          { content: "तालाब", isCorrect: false, order: 2 },
          { content: "कुएं एवं नलकूप", isCorrect: true, order: 3 },
          { content: "खेतीय तालाब", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 67,
  marks: 1,
  question: {
    create: {
      content: "राजस्थान के बारे में कौन सा कथन सत्य हैं?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "राजस्थान का क्षेत्रफल 3,42,239 वर्ग किमी है।",
      options: {
        create: [
          { content: "इसका आकार विषमकोण चतुर्भुज के समान है", isCorrect: false, order: 1 },
          { content: "इसका उत्तर से दक्षिण विस्तार 869 किमी. है", isCorrect: false, order: 2 },
          { content: "इसकी स्थलीय सीमा 6920 किमी. है", isCorrect: false, order: 3 },
          { content: "इसका क्षेत्रफल 3,42,329 वर्ग किमी है", isCorrect: true, order: 4 }
        ]
      }
    }
  }
},
{
  order: 68,
  marks: 1,
  question: {
    create: {
      content: "राजस्थान की कौन सी नदी कर्क रेखा को दो बार पार करती है?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "माही नदी कर्क रेखा को दो बार पार करती है।",
      options: {
        create: [
          { content: "चंबल", isCorrect: false, order: 1 },
          { content: "बनास", isCorrect: false, order: 2 },
          { content: "माही", isCorrect: true, order: 3 },
          { content: "लूणी", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 69,
  marks: 1,
  question: {
    create: {
      content: "चूलिया जलप्रपात किस नदी द्वारा बनाया गया है?",
      difficulty: "EASY",
      marks: 1,
      explanation: "चूलिया जलप्रपात चम्बल नदी द्वारा बनाया गया है।",
      options: {
        create: [
          { content: "चम्बल नदी", isCorrect: true, order: 1 },
          { content: "बनास नदी", isCorrect: false, order: 2 },
          { content: "साबरमती नदी", isCorrect: false, order: 3 },
          { content: "घग्घर नदी", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 70,
  marks: 1,
  question: {
    create: {
      content: "निम्नलिखित में से कौनसी नदी आन्तरिक प्रवाह का भाग नहीं है?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "काकनी नदी आन्तरिक प्रवाह का भाग नहीं है।",
      options: {
        create: [
          { content: "साबी", isCorrect: false, order: 1 },
          { content: "खारी", isCorrect: false, order: 2 },
          { content: "कान्तली", isCorrect: false, order: 3 },
          { content: "काकनी", isCorrect: true, order: 4 }
        ]
      }
    }
  }
},
{
  order: 71,
  marks: 1,
  question: {
    create: {
      content: "निम्नांकित में से कौनसी राजस्थान की एक नदी अन्तः प्रवाह प्रणाली के अर्न्तगत नहीं है?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "पार्वती नदी चम्बल की सहायक नदी है और बंगाल की खाड़ी में गिरती है, अतः यह अन्तः प्रवाह प्रणाली के अंतर्गत नहीं है।",
      options: {
        create: [
          { content: "पार्वती", isCorrect: true, order: 1 },
          { content: "कांतली", isCorrect: false, order: 2 },
          { content: "काकनी", isCorrect: false, order: 3 },
          { content: "घग्गर", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 72,
  marks: 1,
  question: {
    create: {
      content: "निम्न को सुमेलित कीजिए-",
      difficulty: "HARD",
      marks: 1,
      explanation: "घग्घर मैदान अन्तः प्रवाहित अपवाह के साथ सही मेल है।",
      options: {
        create: [
          { content: "मेवाड़ पर्वतीय प्रदेश - मुकन्दरा पहाड़ी", isCorrect: false, order: 1 },
          { content: "हाड़ौती पठार - नाली", isCorrect: false, order: 2 },
          { content: "शेखावटी प्रदेश - गिरवा", isCorrect: false, order: 3 },
          { content: "घग्घर मैदान - अन्तः प्रवाहित अपवाह", isCorrect: true, order: 4 }
        ]
      }
    }
  }
},
{
  order: 73,
  marks: 1,
  question: {
    create: {
      content: "राणा प्रताप सागर बांध राजस्थान के किस जिले में स्थित है?",
      difficulty: "EASY",
      marks: 1,
      explanation: "राणा प्रताप सागर बांध चितौड़गढ़ जिले में स्थित है।",
      options: {
        create: [
          { content: "उदयपुर", isCorrect: false, order: 1 },
          { content: "चितौड़गढ़", isCorrect: true, order: 2 },
          { content: "राजसमंद", isCorrect: false, order: 3 },
          { content: "कोटा", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 74,
  marks: 1,
  question: {
    create: {
      content: "रामगढ़ विषधारी वन्य जीव अभयारण्य राजस्थान के निम्नलिखित में से किस स्थान में स्थित है?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "रामगढ़ विषधारी वन्य जीव अभयारण्य बूंदी में स्थित है।",
      options: {
        create: [
          { content: "बूंदी", isCorrect: true, order: 1 },
          { content: "जयपुर", isCorrect: false, order: 2 },
          { content: "चुरू", isCorrect: false, order: 3 },
          { content: "भरतपुर", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 75,
  marks: 1,
  question: {
    create: {
      content: "निम्न में से राजस्थान का प्रथम किसान आंदोलन कौनसा हैं?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "बिजौलिया किसान आंदोलन राजस्थान का प्रथम किसान आंदोलन था।",
      options: {
        create: [
          { content: "एकी किसान आंदोलन", isCorrect: false, order: 1 },
          { content: "बिजौलिया किसान आंदोलन", isCorrect: true, order: 2 },
          { content: "बेंगू किसान आंदोलन", isCorrect: false, order: 3 },
          { content: "दुदवा खारा किसान आंदोलन", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 76,
  marks: 1,
  question: {
    create: {
      content: "वर्ष 2011 में राजस्थान में ग्रामीण जनसंख्या का प्रतिशत था -",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "2011 की जनगणना के अनुसार राजस्थान में ग्रामीण जनसंख्या 75.1% थी।",
      options: {
        create: [
          { content: "70.2", isCorrect: false, order: 1 },
          { content: "75.1", isCorrect: true, order: 2 },
          { content: "64.4", isCorrect: false, order: 3 },
          { content: "81.9", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 77,
  marks: 1,
  question: {
    create: {
      content: "'नोगरी' आभूषण शरीर के किस अंग में पहना जाता हैं?",
      difficulty: "EASY",
      marks: 1,
      explanation: "'नोगरी' आभूषण नाक में पहना जाता है।",
      options: {
        create: [
          { content: "हाथ", isCorrect: false, order: 1 },
          { content: "कमर", isCorrect: false, order: 2 },
          { content: "गला", isCorrect: false, order: 3 },
          { content: "नाक", isCorrect: true, order: 4 }
        ]
      }
    }
  }
},
{
  order: 78,
  marks: 1,
  question: {
    create: {
      content: "1919 के अधिनियम के अंतर्गत प्रान्तीय प्रशासन में जो महान परिवर्तन आया वह है -",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "1919 के अधिनियम से प्रांतों में द्वैध शासन की स्थापना हुई।",
      options: {
        create: [
          { content: "प्रांतो में कांग्रेस सरकार की स्थापना", isCorrect: false, order: 1 },
          { content: "प्रांतो में द्वैध शासन की स्थापना", isCorrect: true, order: 2 },
          { content: "प्रांतो में स्वायत्त शासन की स्थापना", isCorrect: false, order: 3 },
          { content: "प्रांतो के गर्वनरे अधिकारविहीन हो गये", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 79,
  marks: 1,
  question: {
    create: {
      content: "प्रकाश किसी समतल दर्पण से टकराता है, तो परावर्तन कोण (Angle of reflection) किसके बराबर होता है?",
      difficulty: "EASY",
      marks: 1,
      explanation: "परावर्तन का नियम: परावर्तन कोण आपतन कोण के बराबर होता है।",
      options: {
        create: [
          { content: "0°", isCorrect: false, order: 1 },
          { content: "आपतन कोण के बराबर", isCorrect: true, order: 2 },
          { content: "90°", isCorrect: false, order: 3 },
          { content: "दर्पण के कोण के बराबर", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 80,
  marks: 1,
  question: {
    create: {
      content: "राजस्थान उच्च न्यायालय के पहले मुख्य न्यायाधीश कौन थे-",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "सरंजू प्रसाद राजस्थान उच्च न्यायालय के पहले मुख्य न्यायाधीश थे।",
      options: {
        create: [
          { content: "के. के. वर्मा", isCorrect: false, order: 1 },
          { content: "डी.एस. दवे", isCorrect: false, order: 2 },
          { content: "सरंजू प्रसाद", isCorrect: true, order: 3 },
          { content: "इनमें से कोई नहीं", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 81,
  marks: 1,
  question: {
    create: {
      content: "जनगणना 2011 के अनुसार, जनसंख्या आकार के आधार पर भारत में राजस्थान राज्य का क्या स्थान था?",
      difficulty: "EASY",
      marks: 1,
      explanation: "जनगणना 2011 के अनुसार जनसंख्या के आधार पर राजस्थान का आठवां स्थान था।",
      options: {
        create: [
          { content: "सातवां", isCorrect: false, order: 1 },
          { content: "पांचवां", isCorrect: false, order: 2 },
          { content: "आठवां", isCorrect: true, order: 3 },
          { content: "नौवां", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 82,
  marks: 1,
  question: {
    create: {
      content: "विश्व मानचित्र में राजस्थान की स्थिति एवं विस्तार है",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "राजस्थान का विस्तार 23°3' से 30°12' उत्तरी अक्षांश तक है।",
      options: {
        create: [
          { content: "23°12' से 30°3' उत्तरी अक्षांश तक", isCorrect: false, order: 1 },
          { content: "23°3' से 30°22' उत्तरी अक्षांश तक", isCorrect: false, order: 2 },
          { content: "23°3 से 30°12 उत्तरी अक्षांश तक", isCorrect: true, order: 3 },
          { content: "23°2' से 30°12 उत्तरी अक्षांश तक", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 83,
  marks: 1,
  question: {
    create: {
      content: "निम्नलिखित में से राजस्थान की सबसे बड़ी कृत्रिम झील कौन-सी है?",
      difficulty: "EASY",
      marks: 1,
      explanation: "जयसंमद राजस्थान की सबसे बड़ी कृत्रिम झील है।",
      options: {
        create: [
          { content: "जयसंमद", isCorrect: true, order: 1 },
          { content: "डीडवाना", isCorrect: false, order: 2 },
          { content: "पिछोला", isCorrect: false, order: 3 },
          { content: "उदयसागर", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 84,
  marks: 1,
  question: {
    create: {
      content: "राजस्थान में कौन-सी एकमात्र नदी जो वर्षा में बारहों महीने तक बहती है?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "चंबल राजस्थान की एकमात्र नदी है जो बारहों महीने बहती है।",
      options: {
        create: [
          { content: "बाणगंगा", isCorrect: false, order: 1 },
          { content: "साबरती", isCorrect: false, order: 2 },
          { content: "चंबल", isCorrect: true, order: 3 },
          { content: "माही", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 85,
  marks: 1,
  question: {
    create: {
      content: "सही उत्तर का चयन नीचे दिये कूट से कीजिए - सूची-1 (झीलें) सूची-II (जिलें) गैब सागर (i) धौलपुर तालाब शाही (ii) बूंदी कोलायत (iii) डूंगरपुर नवलखा (iv) बीकानेर",
      difficulty: "HARD",
      marks: 1,
      explanation: "गैब सागर-डूंगरपुर, तालाब शाही-धौलपुर, कोलायत-बीकानेर, नवलखा-बूंदी",
      options: {
        create: [
          { content: "A-iii, B-i, C-ii, D-iv", isCorrect: false, order: 1 },
          { content: "A-iii, B-i, C-iv,D-ii", isCorrect: true, order: 2 },
          { content: "A-ii, B-iii,C-i,D-iv", isCorrect: false, order: 3 },
          { content: "A-iii, B-i, C-iv, D-ii", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 86,
  marks: 1,
  question: {
    create: {
      content: "कोपन के वर्गीकरण के अनुसार गंगानगर, हनुमानगढ़ और बीकानेर में किस प्रकार की जलवायु मिलती है?",
      difficulty: "HARD",
      marks: 1,
      explanation: "कोपन के अनुसार इन क्षेत्रों में Bwhw प्रकार की जलवायु मिलती है।",
      options: {
        create: [
          { content: "Bwhw", isCorrect: true, order: 1 },
          { content: "BShw", isCorrect: false, order: 2 },
          { content: "Cwg", isCorrect: false, order: 3 },
          { content: "Aw", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 87,
  marks: 1,
  question: {
    create: {
      content: "'लिंगानुपात' का क्या अर्थ है?",
      difficulty: "EASY",
      marks: 1,
      explanation: "लिंगानुपात का अर्थ है प्रति 1000 पुरुषों पर स्त्रियों की संख्या।",
      options: {
        create: [
          { content: "प्रति 100 पुरुषों पर स्त्रियों की संख्या", isCorrect: false, order: 1 },
          { content: "प्रति 1000 पुरुषों पर स्त्रियों की संख्या", isCorrect: true, order: 2 },
          { content: "प्रति 10000 पुरुषों पर स्त्रियों की संख्या", isCorrect: false, order: 3 },
          { content: "प्रति 100000 पुरुषों पर स्त्रियों की संख्या", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 88,
  marks: 1,
  question: {
    create: {
      content: "चूलिया जल प्रपात के नीचे की ओर राजस्थान में कौन-सा बांध बना है?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "चूलिया जल प्रपात के नीचे की ओर राणा प्रताप सागर बांध बना है।",
      options: {
        create: [
          { content: "जवाहर सागर बांध", isCorrect: false, order: 1 },
          { content: "गांधी सागर बांध", isCorrect: false, order: 2 },
          { content: "राणा प्रताप सागर बांध", isCorrect: true, order: 3 },
          { content: "नांगल बांध", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 89,
  marks: 1,
  question: {
    create: {
      content: "2001-2011 के दशक में निम्नलिखित में से राजस्थान के किस जिले की जनसंख्या वृद्धि दर सर्वाधिक थी?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "2001-2011 के दशक में बाड़मेर की जनसंख्या वृद्धि दर सर्वाधिक थी।",
      options: {
        create: [
          { content: "बाड़मेर", isCorrect: true, order: 1 },
          { content: "कोटा", isCorrect: false, order: 2 },
          { content: "जयपुर", isCorrect: false, order: 3 },
          { content: "बीकानेर", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 90,
  marks: 1,
  question: {
    create: {
      content: "'हाडौती सेवा संघ' का संस्थापक कौन था?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "नयनूराम शर्मा 'हाडौती सेवा संघ' के संस्थापक थे।",
      options: {
        create: [
          { content: "नयनूराम शर्मा", isCorrect: true, order: 1 },
          { content: "ऋषिदत्त मेहता", isCorrect: false, order: 2 },
          { content: "केशरीसिंह बारहठ", isCorrect: false, order: 3 },
          { content: "ऋषिदत्त मेहता", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 91,
  marks: 1,
  question: {
    create: {
      content: "किशोर सागर झील (तालाब) कहां स्थित है?",
      difficulty: "EASY",
      marks: 1,
      explanation: "किशोर सागर झील कोटा में स्थित है।",
      options: {
        create: [
          { content: "बूंदी", isCorrect: false, order: 1 },
          { content: "किशनगढ़", isCorrect: false, order: 2 },
          { content: "उदयपुर", isCorrect: false, order: 3 },
          { content: "कोटा", isCorrect: true, order: 4 }
        ]
      }
    }
  }
},
{
  order: 92,
  marks: 1,
  question: {
    create: {
      content: "निम्नलिखित बोलियों में से कौनसी ढुंढाड़ी की उप-बोली नहीं है?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "अहीरवाटी ढुंढाड़ी की उप-बोली नहीं है।",
      options: {
        create: [
          { content: "तोरावाटी", isCorrect: false, order: 1 },
          { content: "राजावाटी", isCorrect: false, order: 2 },
          { content: "नागरचोल", isCorrect: false, order: 3 },
          { content: "अहीरवाटी", isCorrect: true, order: 4 }
        ]
      }
    }
  }
},
{
  order: 93,
  marks: 1,
  question: {
    create: {
      content: "संविधान में मौलिक कर्तव्य किस अनुच्छेद में दिये गये हैं",
      difficulty: "EASY",
      marks: 1,
      explanation: "संविधान में मौलिक कर्तव्य अनुच्छेद 51-A में दिये गये हैं।",
      options: {
        create: [
          { content: "48", isCorrect: false, order: 1 },
          { content: "50", isCorrect: false, order: 2 },
          { content: "47", isCorrect: false, order: 3 },
          { content: "51-A", isCorrect: true, order: 4 }
        ]
      }
    }
  }
},
{
  order: 94,
  marks: 1,
  question: {
    create: {
      content: "जीन का प्रमुख कार्य क्या होता है?",
      difficulty: "EASY",
      marks: 1,
      explanation: "जीन का प्रमुख कार्य आनुवंशिक लक्षणों का वहन करना है।",
      options: {
        create: [
          { content: "कोशिका को ऊर्जा देना", isCorrect: false, order: 1 },
          { content: "आनुवंशिक लक्षणों का वहन करना", isCorrect: true, order: 2 },
          { content: "प्रोटीन को नष्ट करना", isCorrect: false, order: 3 },
          { content: "कोशिका विभाजन रोकना", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 95,
  marks: 1,
  question: {
    create: {
      content: "किस अधिनियम द्वारा जिला कलेक्टर को जिला आपदा प्रबंधन प्राधिकरण का अध्यक्ष बनाया गया?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "आपदा प्रबंधन अधिनियम, 2005 द्वारा जिला कलेक्टर को जिला आपदा प्रबंधन प्राधिकरण का अध्यक्ष बनाया गया।",
      options: {
        create: [
          { content: "आपदा प्रबंधन अधिनियम, 2004", isCorrect: false, order: 1 },
          { content: "आपदा प्रबंधन अधिनियम, 2005", isCorrect: true, order: 2 },
          { content: "आपदा प्रबंधन अधिनियम, 2007", isCorrect: false, order: 3 },
          { content: "आपदा प्रबंधन अधिनियम, 2008", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 96,
  marks: 1,
  question: {
    create: {
      content: "CPU का कौन-सा भाग सभी गणनाएँ करता है?",
      difficulty: "EASY",
      marks: 1,
      explanation: "ALU (Arithmetic Logic Unit) CPU का वह भाग है जो सभी गणनाएँ करता है।",
      options: {
        create: [
          { content: "कंट्रोल यूनिट", isCorrect: false, order: 1 },
          { content: "रजिस्टर", isCorrect: false, order: 2 },
          { content: "ALU", isCorrect: true, order: 3 },
          { content: "कैश मेमोरी", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 97,
  marks: 1,
  question: {
    create: {
      content: "राष्ट्रीय विज्ञान दिवस' किस तिथि को मनाया जाता है?",
      difficulty: "EASY",
      marks: 1,
      explanation: "राष्ट्रीय विज्ञान दिवस 28 फरवरी को मनाया जाता है।",
      options: {
        create: [
          { content: "20 फरवरी", isCorrect: false, order: 1 },
          { content: "24 फरवरी", isCorrect: false, order: 2 },
          { content: "23 फरवरी", isCorrect: false, order: 3 },
          { content: "28 फरवरी", isCorrect: true, order: 4 }
        ]
      }
    }
  }
},
{
  order: 98,
  marks: 1,
  question: {
    create: {
      content: "केन्द्रीय शुष्क क्षेत्र अनुसंधान संस्थान (CAZRI) का मुख्यालय राजस्थान में कहाँ पर स्थित है?",
      difficulty: "EASY",
      marks: 1,
      explanation: "CAZRI का मुख्यालय जोधपुर में स्थित है।",
      options: {
        create: [
          { content: "जयपुर", isCorrect: false, order: 1 },
          { content: "दौसा", isCorrect: false, order: 2 },
          { content: "अजमेर", isCorrect: false, order: 3 },
          { content: "जोधपुर", isCorrect: true, order: 4 }
        ]
      }
    }
  }
},
{
  order: 99,
  marks: 1,
  question: {
    create: {
      content: "'आकल काष्ठ जीवाश्म पार्क' राजस्थान के किस जिले में स्थित है?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "आकल काष्ठ जीवाश्म पार्क जैसलमेर जिले में स्थित है।",
      options: {
        create: [
          { content: "बीकानेर", isCorrect: false, order: 1 },
          { content: "अजमेर", isCorrect: false, order: 2 },
          { content: "कोटा", isCorrect: false, order: 3 },
          { content: "जैसलमेर", isCorrect: true, order: 4 }
        ]
      }
    }
  }
},
{
  order: 100,
  marks: 1,
  question: {
    create: {
      content: "राजस्थान में काष्ठ जीवाश्म उद्यान (Wood Fossil Park) किस स्थान पर स्थित है?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "काष्ठ जीवाश्म उद्यान जैसलमेर में स्थित है।",
      options: {
        create: [
          { content: "उदयपुर", isCorrect: false, order: 1 },
          { content: "सिरोही", isCorrect: false, order: 2 },
          { content: "जैसलमेर", isCorrect: true, order: 3 },
          { content: "बीकानेर", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 101,
  marks: 1,
  question: {
    create: {
      content: "राजस्थान के किन जिलों में 'वर्टीसोल्स' मृदा नहीं पाई जाती है?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "बीकानेर-चूरू में वर्टीसोल्स (काली मिट्टी) नहीं पाई जाती।",
      options: {
        create: [
          { content: "कोटा-बूंदी", isCorrect: false, order: 1 },
          { content: "बीकानेर-चूरू", isCorrect: true, order: 2 },
          { content: "बारां-कोटा", isCorrect: false, order: 3 },
          { content: "बांसवाड़ा-झालावाड़", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 102,
  marks: 1,
  question: {
    create: {
      content: "राजस्थान में मिश्रित लाल और काली मिट्टी में सामान्यतया कौनसी फसलें उगाई जाती हैं?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "मिश्रित लाल और काली मिट्टी में गेहूं, चना की फसलें उगाई जाती हैं।",
      options: {
        create: [
          { content: "चावल, गन्ना", isCorrect: false, order: 1 },
          { content: "मूंगफली, सरसों", isCorrect: false, order: 2 },
          { content: "गेहूं, चना", isCorrect: true, order: 3 },
          { content: "कपास, मक्का", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 103,
  marks: 1,
  question: {
    create: {
      content: "जवाहर सागर बांध निम्नलिखित में से किस नदी पर है?",
      difficulty: "EASY",
      marks: 1,
      explanation: "जवाहर सागर बांध चंबल नदी पर है।",
      options: {
        create: [
          { content: "सतलज", isCorrect: false, order: 1 },
          { content: "साबरमती", isCorrect: false, order: 2 },
          { content: "बांदी", isCorrect: false, order: 3 },
          { content: "चंबल", isCorrect: true, order: 4 }
        ]
      }
    }
  }
},
{
  order: 104,
  marks: 1,
  question: {
    create: {
      content: "निम्नांकित में से कौनसा युग्म सुमेलित है? नदी - सहायक नदी (A) माही - सोम (B) बनास - कोठारी (C) साबरमती - मोरेन (D) लूनी - बाण्डी",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "माही - सोम का युग्म सुमेलित है।",
      options: {
        create: [
          { content: "माही - सोम", isCorrect: true, order: 1 },
          { content: "बनास - कोठारी", isCorrect: false, order: 2 },
          { content: "साबरमती - मोरेन", isCorrect: false, order: 3 },
          { content: "लूनी - बाण्डी", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 105,
  marks: 1,
  question: {
    create: {
      content: "निम्नलिखित में से किसने भील शिक्षा के लिए \"खड़लाई आश्रम की स्थापना की थी?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "मोतीलाल तेजावत ने भील शिक्षा के लिए खड़लाई आश्रम की स्थापना की थी।",
      options: {
        create: [
          { content: "गोविन्द गिरी", isCorrect: false, order: 1 },
          { content: "शोभा लाल गुप्त", isCorrect: false, order: 2 },
          { content: "मोतीलाल तेजावत", isCorrect: true, order: 3 },
          { content: "माणिक्य लाल वर्मा", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 106,
  marks: 1,
  question: {
    create: {
      content: "तेल का मूल्य 20% बढ़ जाता है किंतु इसकी खपत 8% तक कम हो जाती है। इस पर व्यय में कितने प्रतिशत वृद्धि अथवा कमी हुई?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "नई व्यय = 120% × 92% = 110.4%, अतः 10.4% वृद्धि हुई।",
      options: {
        create: [
          { content: "10% वृद्धि", isCorrect: false, order: 1 },
          { content: "5% वृद्धि", isCorrect: false, order: 2 },
          { content: "10.4% वृद्धि", isCorrect: true, order: 3 },
          { content: "5.5% कमी", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 107,
  marks: 1,
  question: {
    create: {
      content: "एक आदमी एक यात्रा की आधी दूरी 30 मील प्रति घंटे एवं अन्य आधी दुरी 60 मील प्रति घंटे से पूर्ण करता है। यदि पूरी यात्रा 20 मील की हो, तो वह अपनी यात्रा पूर्ण करने में कितना समय लेगा?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "पहली आधी दूरी में 10/30 = 1/3 घंटा, दूसरी आधी में 10/60 = 1/6 घंटा। कुल = 1/3 + 1/6 = 1/2 घंटा = 30 मिनट।",
      options: {
        create: [
          { content: "30 मिनट", isCorrect: true, order: 1 },
          { content: "45 मिनट", isCorrect: false, order: 2 },
          { content: "60 मिनट", isCorrect: false, order: 3 },
          { content: "75 मिनट", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 108,
  marks: 1,
  question: {
    create: {
      content: "एक कार का प्रारंभिक मूल्य 150000 रुपए है। कार के मूल्य में प्रत्येक वर्ष उसके प्रारंभिक मूल्य से 20 प्रतिशत की कमी होती है। 2 वर्ष के बाद इसका मूल्य कितना होगा?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "प्रत्येक वर्ष 20% कमी = 150000 - (2 × 30000) = 90000 रुपए।",
      options: {
        create: [
          { content: "82000 रुपए", isCorrect: false, order: 1 },
          { content: "84000 रुपए", isCorrect: false, order: 2 },
          { content: "90000 रुपए", isCorrect: true, order: 3 },
          { content: "96000 रुपए", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 109,
  marks: 1,
  question: {
    create: {
      content: "किसी व्यक्ति का वेतन 8,100 रुपये से बढ़कर 9,000 रुपये हो जाता हैं। उसके वेतन में हुई प्रतिशत वृद्धि ज्ञात करें।",
      difficulty: "EASY",
      marks: 1,
      explanation: "वृद्धि = 900, प्रतिशत वृद्धि = (900/8100) × 100 = 11.11% ≈ 11%",
      options: {
        create: [
          { content: "6%", isCorrect: false, order: 1 },
          { content: "13%", isCorrect: false, order: 2 },
          { content: "11%", isCorrect: true, order: 3 },
          { content: "9%", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 110,
  marks: 1,
  question: {
    create: {
      content: "एक पुस्तक के मूल्य में पहले 8% की वृद्धि की जाती है और बाद में 8% की कमी की जाती है। पुस्तक के मूल्य में कितने प्रतिशत परिवर्तन हुआ है?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "नया मूल्य = 108% × 92% = 99.36%, अतः 0.64% की कमी।",
      options: {
        create: [
          { content: "कोई परिवर्तन नहीं", isCorrect: false, order: 1 },
          { content: "0.64% की कमी", isCorrect: true, order: 2 },
          { content: "0.064% की कमी", isCorrect: false, order: 3 },
          { content: "0.64% की वृद्धि", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 111,
  marks: 1,
  question: {
    create: {
      content: "यदि प्रकाश की आय आंनद की आय से 25% अधिक हो तो आंनद की आय प्रकाश की आय से कितने प्रतिशत कम है?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "यदि आनंद की आय = 100, तो प्रकाश की = 125। आनंद की आय प्रकाश से (25/125) × 100 = 20% कम।",
      options: {
        create: [
          { content: "25%", isCorrect: false, order: 1 },
          { content: "20%", isCorrect: true, order: 2 },
          { content: "22.5%", isCorrect: false, order: 3 },
          { content: "27.5%", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 112,
  marks: 1,
  question: {
    create: {
      content: "चीनी की कीमत में 20% की वृद्धि की गई है। चीनी की खपत में कितने प्रतिशत की कटौती की जानी चाहिए, जिससे चीनी पर हुए व्यय में कोई अतिरिक्त वृद्धि न हो?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "कटौती = (20/(100+20)) × 100 = 20/120 × 100 = 16.67%",
      options: {
        create: [
          { content: "8%", isCorrect: false, order: 1 },
          { content: "16.67%", isCorrect: true, order: 2 },
          { content: "20%", isCorrect: false, order: 3 },
          { content: "25%", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 113,
  marks: 1,
  question: {
    create: {
      content: "जब किसी खिलौने का मूल्य 30% बढ़ा दिया जाए, तो खिलौने 30% कम बिकते है तो बताइए समस्त विक्रय पर कितने प्रतिशत प्रभाव पड़ेगा?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "नई विक्रय = 130% × 70% = 91%, अतः 9% कम आय।",
      options: {
        create: [
          { content: "कोई प्रभाव नहीं पड़ा", isCorrect: false, order: 1 },
          { content: "9% अधिक आय", isCorrect: false, order: 2 },
          { content: "9% कम आय", isCorrect: true, order: 3 },
          { content: "7% कम आय", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 114,
  marks: 1,
  question: {
    create: {
      content: "23 संख्याओं का औसत 21 है। यदि प्रत्येक संख्या को 2 से गुणा किया जाए तो नया औसत क्या होगा?",
      difficulty: "EASY",
      marks: 1,
      explanation: "जब प्रत्येक संख्या को 2 से गुणा करते हैं तो औसत भी 2 से गुणा हो जाता है। नया औसत = 21 × 2 = 42।",
      options: {
        create: [
          { content: "46", isCorrect: false, order: 1 },
          { content: "21", isCorrect: false, order: 2 },
          { content: "23", isCorrect: false, order: 3 },
          { content: "42", isCorrect: true, order: 4 }
        ]
      }
    }
  }
},
{
  order: 115,
  marks: 1,
  question: {
    create: {
      content: "संख्या 15, 17, 20, 25, 32 और 35 का औसत ज्ञात कीजिए।",
      difficulty: "EASY",
      marks: 1,
      explanation: "योग = 15+17+20+25+32+35 = 144, औसत = 144/6 = 24",
      options: {
        create: [
          { content: "24", isCorrect: true, order: 1 },
          { content: "28", isCorrect: false, order: 2 },
          { content: "18", isCorrect: false, order: 3 },
          { content: "14", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 116,
  marks: 1,
  question: {
    create: {
      content: "एक राशि को 3 वर्षों के लिये किसी निश्चित दर पर साधारण ब्याज पर दिया गया। यदि इसे 3% अधिक ब्याज दर पर दिया होता, तौ रु. 108 अधिक ब्याज मिलता। यह राशि बराबर है-",
      difficulty: "HARD",
      marks: 1,
      explanation: "मूलधन × 3% × 3 वर्ष = 108, मूलधन × 9% = 108, मूलधन = 1200 रुपए।",
      options: {
        create: [
          { content: "रु. 900", isCorrect: false, order: 1 },
          { content: "रु.1200", isCorrect: true, order: 2 },
          { content: "रु.1500", isCorrect: false, order: 3 },
          { content: "रु.1800", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 117,
  marks: 1,
  question: {
    create: {
      content: "P का 60% = Q का 50% तथा Q = P का X% है। X का मान क्या है?",
      difficulty: "MEDIUM",
      marks: 1,
      explanation: "60P/100 = 50Q/100, इसलिए Q = 60P/50 = 1.2P = 120% of P, अतः X = 120।",
      options: {
        create: [
          { content: "130%", isCorrect: false, order: 1 },
          { content: "120%", isCorrect: true, order: 2 },
          { content: "140%", isCorrect: false, order: 3 },
          { content: "80%", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 118,
  marks: 1,
  question: {
    create: {
      content: "यदि साधारण ब्याज की एक विशेष दर से कोई धन 6 वर्षों में दुगुना हो जाए तो यह धन कितने वर्षों में तिगुना हो जाएगा",
      difficulty: "HARD",
      marks: 1,
      explanation: "6 वर्ष में मूलधन = ब्याज, अतः दर = 100/6 = 16.67% प्रति वर्ष। तिगुना होने के लिए ब्याज = 2 × मूलधन, समय = 12 वर्ष।",
      options: {
        create: [
          { content: "12 वर्ष", isCorrect: true, order: 1 },
          { content: "15 वर्ष", isCorrect: false, order: 2 },
          { content: "18 वर्ष", isCorrect: false, order: 3 },
          { content: "14 वर्ष", isCorrect: false, order: 4 }
        ]
      }
    }
  }
},
{
  order: 119,
  marks: 1,
  question: {
    create: {
      content: "एक चलती हुई रेलगाड़ी किसी 50 मीटर लम्बे प्लेटफार्म को 14 सेकण्ड में और एक बिजली के खम्भे को 10 सेकण्ड में पार करती है। रेलगाड़ी की चाल (किमी / घंटा में) क्या है?",
      difficulty: "HARD",
      marks: 1,
      explanation: "मान लें रेलगाड़ी की लंबाई = L मीटर। L = 10 × चाल, L + 50 = 14 × चाल। इससे चाल = 5 मी/से = 18 किमी/घंटा। लेकिन गणना में L = 125 मी, चाल = 12.5 मी/से = 45 किमी/घंटा।",
      options: {
        create: [
          { content: "24", isCorrect: false, order: 1 },
          { content: "36", isCorrect: false, order: 2 },
          { content: "40", isCorrect: false, order: 3 },
          { content: "45", isCorrect: true, order: 4 }
        ]
      }
    }
  }
},
{
  order: 120,
  marks: 1,
  question: {
    create: {
      content: "एक धावक 96 सेकण्ड में 800 मीटर की दौड़ लगाता है। उसकी चाल (किमी./घंटा में) हैं -",
      difficulty: "EASY",
      marks: 1,
      explanation: "चाल = 800/96 = 8.33 मी/से = 8.33 × 3.6 = 30 किमी/घंटा।",
      options: {
        create: [
          { content: "40 किमी./घंटा", isCorrect: false, order: 1 },
          { content: "20 किमी./घंटा", isCorrect: false, order: 2 },
          { content: "25 किमी./घंटा", isCorrect: false, order: 3 },
          { content: "30 किमी./घंटा", isCorrect: true, order: 4 }
        ]
      }
    }
  }
}



            
              ]
            }
          }
        ]
      }
    }
  });

  console.log('âœ… test created:', test.title);

  
  const test1 = await prisma.test.create({
    data: {
      title: 'Rajasthan 4th Grade Full Test - 2',
      description: `Soon...`,
      duration: 120,
      totalMarks: 120,
      negativeMarking: true,
      negativeMarks: 0.33,
      instructions: 'Solve all questions carefully. Use rough paper for calculations.',
      status: 'PUBLISHED',
      isFree: true,
      sections: {
        create: [
          
            
        ]
      }
    }
  });

  console.log('âœ… test1 created:', test1.title);

  // Create a Science test
  const test2 = await prisma.test.create({
    data: {
      title: 'Rajasthan 4th Grade Full Test - 3',
      description:`Soon...`,
      duration: 120,
      totalMarks: 120,
      negativeMarking: true,
      negativeMarks: 0.33,
      instructions: `1. समय अवधि: परीक्षा को 120 मिनट (2 घंटे) में पूर्ण करें
                     2. ब्राउज़र चेतावनी: परीक्षा के दौरान ब्राउज़र को रीफ्रेश न करें क्योंकि इससे उत्तरों का नुकसान हो सकता है
                     3. महत्वपूर्ण सूचना: इस मॉक टेस्ट में प्रत्येक प्रश्न के लिए 4 विकल्प (A, B, C, D) हैं। हालांकि, वास्तविक RSMSSB परीक्षा में "अनुत्तरित प्रश्न" के लिए 5वां विकल्प (E) होगा। अपनी वास्तविक परीक्षा के दौरान इस अंतर के बारे में सावधान रहें।
                     4. अंकन योजना:

                        -> प्रत्येक सही उत्तर के लिए +1 अंक

                        -> प्रत्येक गलत उत्तर के लिए -1/3 अंक

                        -> अनुत्तरित प्रश्नों के लिए 0 अंक

                        -> नेविगेशन: आप प्रश्न संख्या पैनल का उपयोग करके प्रश्नों के बीच जा सकते हैं

                        -> सबमिशन: केवल तभी "परीक्षा सबमिट करें" पर क्लिक करें जब आपने सभी प्रश्नों को पूरा कर लिया हो या उनकी समीक्षा कर ली हो

                        -> तकनीकी आवश्यकताएं: पूरी परीक्षा के दौरान स्थिर इंटरनेट कनेक्शन सुनिश्चित करें`,
      status: 'PUBLISHED',
      isFree: false,
      price: 99.00,
      sections: {
        create: [
          
        ]
      }
    }
  });

}

main()
  .catch((e) => {
    console.error('âŒ Seed failed:', e);
    // process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });