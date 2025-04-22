'use server';

import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/aiml-options.json');

// Helper function to read the decision tree data
async function readDecisionTreeData() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading decision tree data:', error);
    throw new Error('Failed to read decision tree data');
  }
}

// Helper function to write the decision tree data
async function writeDecisionTreeData(data: any) {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    return { success: true };
  } catch (error) {
    console.error('Error writing decision tree data:', error);
    throw new Error('Failed to write decision tree data');
  }
}

// GET handler to retrieve all decision tree data
export async function GET(request: NextRequest) {
  try {
    const data = await readDecisionTreeData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch decision tree data' },
      { status: 500 }
    );
  }
}

// POST handler to update decision tree data
export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    
    // Validate the incoming data structure
    if (!requestData.nodes || !Array.isArray(requestData.nodes)) {
      return NextResponse.json(
        { error: 'Invalid data format' },
        { status: 400 }
      );
    }
    
    await writeDecisionTreeData(requestData);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update decision tree data' },
      { status: 500 }
    );
  }
} 