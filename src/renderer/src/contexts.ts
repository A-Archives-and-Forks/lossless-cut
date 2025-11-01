import React, { useContext } from 'react';
import Color from 'color';

import { UserSettingsRoot } from './hooks/useUserSettingsRoot';
import { ExportMode, SegmentColorIndex } from './types';
import type useLoading from './hooks/useLoading';
import { GenericError } from './components/ErrorDialog';
import { ShowGenericDialog } from './components/GenericDialog';


export type UserSettingsContextType = Omit<UserSettingsRoot, 'settings'> & UserSettingsRoot['settings'] & {
  toggleCaptureFormat: () => void,
  changeOutDir: () => Promise<void>,
  toggleKeyframeCut: (showMessage?: boolean) => void,
  toggleExportConfirmEnabled: () => void,
  toggleSimpleMode: () => void,
  toggleSafeOutputFileName: () => void,
  effectiveExportMode: ExportMode,
}

interface SegColorsContextType {
  getSegColor: (seg: SegmentColorIndex | undefined) => Color
}

export type HandleError = (error: GenericError) => void;

interface AppContextType {
  setWorking: ReturnType<typeof useLoading>['setWorking'],
  working: ReturnType<typeof useLoading>['working'],
  handleError: HandleError,
  showGenericDialog: ShowGenericDialog,
}


export const UserSettingsContext = React.createContext<UserSettingsContextType | undefined>(undefined);
export const SegColorsContext = React.createContext<SegColorsContextType | undefined>(undefined);
export const AppContext = React.createContext<AppContextType | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (context == null) throw new Error('AppContext nullish');
  return context;
}

export const useSegColors = () => {
  const context = useContext(SegColorsContext);
  if (context == null) throw new Error('SegColorsContext nullish');
  return context;
};
