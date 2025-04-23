import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface Node {
  id: string;
  text: string;
  type: 'question' | 'recommendation';
  children?: string[];
  category?: string;
  skillLevel?: 'beginner' | 'intermediate' | 'advanced';
  options?: {
    text: string;
    nextNode: string;
  }[];
  recommendation?: {
    title: string;
    description: string;
    pros: string[];
    cons: string[];
    sampleTools: {
      name: string;
      url: string;
      description: string;
    }[];
    learningResources?: {
      title: string;
      url: string;
      type: 'article' | 'video' | 'course';
    }[];
  };
}

export interface DecisionTreeState {
  nodes: Record<string, Node>;
  currentNodeId: string;
  history: string[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string | null;
}

const initialState: DecisionTreeState = {
  nodes: {},
  currentNodeId: 'root',
  history: ['root'],
  loading: false,
  error: null,
  searchQuery: '',
  selectedCategory: null,
};

export const decisionTreeSlice = createSlice({
  name: 'decisionTree',
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<Record<string, Node>>) => {
      state.nodes = action.payload;
    },
    setCurrentNode: (state, action: PayloadAction<string>) => {
      state.currentNodeId = action.payload;
      state.history.push(action.payload);
    },
    goBack: (state) => {
      if (state.history.length > 1) {
        state.history.pop(); // Remove current node
        state.currentNodeId = state.history[state.history.length - 1];
      }
    },
    resetTree: (state) => {
      state.currentNodeId = 'root';
      state.history = ['root'];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const {
  setNodes,
  setCurrentNode,
  goBack,
  resetTree,
  setLoading,
  setError,
  setSearchQuery,
  setSelectedCategory,
} = decisionTreeSlice.actions;

export const selectNodes = (state: RootState) => state.decisionTree.nodes;
export const selectCurrentNode = (state: RootState) => {
  const currentNodeId = state.decisionTree.currentNodeId;
  return state.decisionTree.nodes[currentNodeId];
};
export const selectHistory = (state: RootState) => state.decisionTree.history;
export const selectLoading = (state: RootState) => state.decisionTree.loading;
export const selectError = (state: RootState) => state.decisionTree.error;
export const selectSearchQuery = (state: RootState) => state.decisionTree.searchQuery;
export const selectSelectedCategory = (state: RootState) => state.decisionTree.selectedCategory;

export default decisionTreeSlice.reducer; 