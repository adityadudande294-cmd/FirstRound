import React from 'react';
import { PlacementToolkitModal } from './PlacementToolkitModal';
import { TestCategory } from '../types';

export interface ScratchpadModalProps {
  onClose: () => void;
  userId?: string;
  activeTestCategory?: TestCategory | string;
  activeTestTitle?: string;
}

export const ScratchpadModal: React.FC<ScratchpadModalProps> = (props) => {
  return <PlacementToolkitModal {...props} />;
};

export { PlacementToolkitModal };
