// app/api/analyze/route.js

import { NextResponse } from 'next/server';
import { LanguageServiceClient } from '@google-cloud/language';

// Create a client instance
const client = new LanguageServiceClient();

export async function POST(req) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ message: 'No text provided' }, { status: 400 });
    }

    // Prepare the request for the Natural Language API
    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };

    // Analyze the text for sentiment and syntax
    const [result] = await client.analyzeSentiment({ document });

    // Extract data from the response
    const sentiment = result.documentSentiment;
    const sentences = result.sentences.map(sentence => ({
      content: sentence.text.content,
      score: sentence.sentiment.score,
    }));

    // Generate a basic summary (for demonstration purposes)
    const summary = sentences.map(sentence => sentence.content).join(' ');

    const insights = {
      overallScore: sentiment.score,
      magnitude: sentiment.magnitude,
      sentences,
    };

    // Return the analysis results
    return NextResponse.json({ summary, insights }, { status: 200 });
  } catch (error) {
    console.error('Error analyzing text:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
