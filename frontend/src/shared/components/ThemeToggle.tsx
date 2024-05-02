import { Switch, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div className="inline-flex items-center gap-2.5">
      <SunIcon width={22} className={className} />
      <Switch size="sm" isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
      <MoonIcon width={18} className={className} />
    </div>
  );
}
