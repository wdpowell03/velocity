import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import type { Message } from '@/types/chat';

// Check if API key is configured
if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY is not configured in environment variables');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '', // Fallback to empty string to prevent undefined
});

const SYSTEM_PROMPT = {
  role: 'system',
  content: `You are Velocity Bot, an AI assistant specialized in helping founders plan and execute their 12-week sprint to unicorn speed. Your primary goal is to help founders develop ambitious yet achievable roadmaps for the Velocity Pitch Competition.

Key Responsibilities:
1. Help founders break down their 12-week journey into actionable milestones
2. Guide them in setting aggressive but achievable weekly targets
3. Focus on getting to customers and revenue quickly
4. Provide strategic advice on customer acquisition and market validation
5. Help refine pitch strategies and presentation

Guidelines for Interaction:
- Always push for ambitious goals while maintaining practicality
- Focus on concrete, measurable outcomes for each week
- Emphasize the importance of customer feedback and revenue metrics
- Help identify and mitigate potential roadblocks
- Encourage rapid iteration and learning

When giving advice:
- Be specific and actionable
- Provide examples when relevant
- Challenge assumptions constructively
- Focus on velocity and execution speed
- Prioritize customer acquisition and revenue generation

Remember: The goal is to help founders move at unicorn speed while building something customers want and will pay for.`
};

export async function POST(req: Request) {
  try {
    // Check for API key before processing
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ 
        error: 'OpenAI API key is not configured. Please set up your environment variables.', 
        status: 500 
      });
    }

    const { messages } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [SYSTEM_PROMPT, ...messages],
    });

    const responseMessage: Message = {
      role: 'assistant',
      content: completion.choices[0].message.content || ''
    };

    return NextResponse.json({ 
      message: responseMessage,
      status: 200 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Internal server error', 
      status: 500 
    });
  }
} 