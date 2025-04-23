import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  activeTab: 'explore' | 'search' | 'saved' | 'settings';
  modalOpen: boolean;
  modalContent: string | null;
  notifications: {
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    message: string;
  }[];
}

const initialState: UIState = {
  theme: 'light',
  sidebarOpen: true,
  activeTab: 'explore',
  modalOpen: false,
  modalContent: null,
  notifications: [],
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<'explore' | 'search' | 'saved' | 'settings'>) => {
      state.activeTab = action.payload;
    },
    openModal: (state, action: PayloadAction<string>) => {
      state.modalOpen = true;
      state.modalContent = action.payload;
    },
    closeModal: (state) => {
      state.modalOpen = false;
      state.modalContent = null;
    },
    addNotification: (state, action: PayloadAction<{ 
      type: 'info' | 'success' | 'warning' | 'error';
      message: string;
    }>) => {
      const id = Date.now().toString();
      state.notifications.push({
        id,
        ...action.payload,
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  setActiveTab,
  openModal,
  closeModal,
  addNotification,
  removeNotification,
  clearNotifications,
} = uiSlice.actions;

export const selectTheme = (state: RootState) => state.ui.theme;
export const selectSidebarOpen = (state: RootState) => state.ui.sidebarOpen;
export const selectActiveTab = (state: RootState) => state.ui.activeTab;
export const selectModalOpen = (state: RootState) => state.ui.modalOpen;
export const selectModalContent = (state: RootState) => state.ui.modalContent;
export const selectNotifications = (state: RootState) => state.ui.notifications;

export default uiSlice.reducer; 