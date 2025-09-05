import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('ðŸŒ± Starting seed process...');

  // Create sample test with correct field names based on your schema
  const test = await prisma.test.create({
    data: {
      title: 'General Knowledge Test',
      description: 'A comprehensive general knowledge test for government exam preparation',
      duration: 60,
      totalMarks: 50,
      negativeMarking: true,
      negativeMarks: 0.25,
      instructions: 'Read all questions carefully. Each question carries 1 mark. There is negative marking of 0.25 for wrong answers.',
      status: 'PUBLISHED',
      isFree: true,
      sections: {
        create: [
          {
            title: 'General Knowledge',
            description: 'Basic GK questions',
            order: 1,
            questions: { // This matches your schema: questions: SectionQuestion[]
              create: [
                {
                  order: 1,
                  marks: 1,
                  question: {
                    create: {
                      content: 'What is the capital of India?',
                      difficulty: 'EASY',
                      marks: 1,
                      explanation: 'New Delhi is the capital of India.',
                      options: {
                        create: [
                          { content: 'Mumbai', isCorrect: false, order: 1 },
                          { content: 'New Delhi', isCorrect: true, order: 2 },
                          { content: 'Kolkata', isCorrect: false, order: 3 },
                          { content: 'Chennai', isCorrect: false, order: 4 }
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
                      content: 'Which planet is known as the Red Planet?',
                      difficulty: 'EASY',
                      marks: 1,
                      explanation: 'Mars is known as the Red Planet due to its reddish appearance.',
                      options: {
                        create: [
                          { content: 'Venus', isCorrect: false, order: 1 },
                          { content: 'Mars', isCorrect: true, order: 2 },
                          { content: 'Jupiter', isCorrect: false, order: 3 },
                          { content: 'Saturn', isCorrect: false, order: 4 }
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
                      content: 'Who was the first Prime Minister of India?',
                      difficulty: 'EASY',
                      marks: 1,
                      explanation: 'Jawaharlal Nehru was the first Prime Minister of India.',
                      options: {
                        create: [
                          { content: 'Mahatma Gandhi', isCorrect: false, order: 1 },
                          { content: 'Jawaharlal Nehru', isCorrect: true, order: 2 },
                          { content: 'Sardar Patel', isCorrect: false, order: 3 },
                          { content: 'Dr. APJ Abdul Kalam', isCorrect: false, order: 4 }
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
                      content: 'In which year did India gain independence?',
                      difficulty: 'EASY',
                      marks: 1,
                      explanation: 'India gained independence on August 15, 1947.',
                      options: {
                        create: [
                          { content: '1945', isCorrect: false, order: 1 },
                          { content: '1947', isCorrect: true, order: 2 },
                          { content: '1950', isCorrect: false, order: 3 },
                          { content: '1952', isCorrect: false, order: 4 }
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
                      content: 'Which is the longest river in India?',
                      difficulty: 'MEDIUM',
                      marks: 1,
                      explanation: 'The Ganges is the longest river in India.',
                      options: {
                        create: [
                          { content: 'Yamuna', isCorrect: false, order: 1 },
                          { content: 'Ganges', isCorrect: true, order: 2 },
                          { content: 'Brahmaputra', isCorrect: false, order: 3 },
                          { content: 'Godavari', isCorrect: false, order: 4 }
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

  console.log('âœ… Sample test created:', test.title);

  // Create another test - Mathematics
  const mathTest = await prisma.test.create({
    data: {
      title: 'Mathematics Test',
      description: 'Basic mathematics questions for competitive exams',
      duration: 45,
      totalMarks: 40,
      negativeMarking: true,
      negativeMarks: 0.25,
      instructions: 'Solve all questions carefully. Use rough paper for calculations.',
      status: 'PUBLISHED',
      isFree: true,
      sections: {
        create: [
          {
            title: 'Arithmetic',
            description: 'Basic arithmetic problems',
            order: 1,
            questions: {
              create: [
                {
                  order: 1,
                  marks: 2,
                  question: {
                    create: {
                      content: 'What is 15 + 27?',
                      difficulty: 'EASY',
                      marks: 2,
                      explanation: '15 + 27 = 42',
                      options: {
                        create: [
                          { content: '40', isCorrect: false, order: 1 },
                          { content: '42', isCorrect: true, order: 2 },
                          { content: '44', isCorrect: false, order: 3 },
                          { content: '46', isCorrect: false, order: 4 }
                        ]
                      }
                    }
                  }
                },
                {
                  order: 2,
                  marks: 2,
                  question: {
                    create: {
                      content: 'What is 144 Ã· 12?',
                      difficulty: 'EASY',
                      marks: 2,
                      explanation: '144 divided by 12 equals 12',
                      options: {
                        create: [
                          { content: '10', isCorrect: false, order: 1 },
                          { content: '11', isCorrect: false, order: 2 },
                          { content: '12', isCorrect: true, order: 3 },
                          { content: '13', isCorrect: false, order: 4 }
                        ]
                      }
                    }
                  }
                },
                {
                  order: 3,
                  marks: 2,
                  question: {
                    create: {
                      content: 'What is the square root of 64?',
                      difficulty: 'MEDIUM',
                      marks: 2,
                      explanation: 'The square root of 64 is 8 because 8 Ã— 8 = 64',
                      options: {
                        create: [
                          { content: '6', isCorrect: false, order: 1 },
                          { content: '7', isCorrect: false, order: 2 },
                          { content: '8', isCorrect: true, order: 3 },
                          { content: '9', isCorrect: false, order: 4 }
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

  console.log('âœ… Sample math test created:', mathTest.title);

  // Create a Science test
  const scienceTest = await prisma.test.create({
    data: {
      title: 'Science Test',
      description: 'Basic science questions covering physics, chemistry, and biology',
      duration: 60,
      totalMarks: 60,
      negativeMarking: true,
      negativeMarks: 0.33,
      instructions: 'Answer all questions. There is negative marking for incorrect answers.',
      status: 'PUBLISHED',
      isFree: false,
      price: 99.00,
      sections: {
        create: [
          {
            title: 'Physics',
            description: 'Basic physics questions',
            order: 1,
            questions: {
              create: [
                {
                  order: 1,
                  marks: 2,
                  question: {
                    create: {
                      content: 'What is the unit of electric current?',
                      difficulty: 'EASY',
                      marks: 2,
                      explanation: 'Ampere is the unit of electric current.',
                      options: {
                        create: [
                          { content: 'Volt', isCorrect: false, order: 1 },
                          { content: 'Ampere', isCorrect: true, order: 2 },
                          { content: 'Ohm', isCorrect: false, order: 3 },
                          { content: 'Watt', isCorrect: false, order: 4 }
                        ]
                      }
                    }
                  }
                },
                {
                  order: 2,
                  marks: 2,
                  question: {
                    create: {
                      content: 'What is the speed of light in vacuum?',
                      difficulty: 'MEDIUM',
                      marks: 2,
                      explanation: 'The speed of light in vacuum is approximately 3 Ã— 10^8 m/s.',
                      options: {
                        create: [
                          { content: '3 Ã— 10^6 m/s', isCorrect: false, order: 1 },
                          { content: '3 Ã— 10^8 m/s', isCorrect: true, order: 2 },
                          { content: '3 Ã— 10^10 m/s', isCorrect: false, order: 3 },
                          { content: '3 Ã— 10^12 m/s', isCorrect: false, order: 4 }
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

  console.log('âœ… Sample science test created:', scienceTest.title);
  
  console.log('ðŸŽ‰ Seed process completed successfully!');
  console.log(`Created ${3} tests with questions and options.`);
}

main()
  .catch((e) => {
    console.error('âŒ Seed failed:', e);
    // process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });