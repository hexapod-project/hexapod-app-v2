import {PropsWithChildren, useEffect, useState} from 'react';

export type TabWrapperProps = {
  currentIndex: number;
  index: number;
  initializeOnshow?: boolean;
};

export default function TabWrapper({
  currentIndex,
  index,
  initializeOnshow,
  children,
}: TabWrapperProps & PropsWithChildren) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized && currentIndex == index) {
      setIsInitialized(true);
    }
  }, [currentIndex, isInitialized]);

  if (!isInitialized && initializeOnshow && currentIndex != index) {
    return <></>;
  }

  return children;
}
