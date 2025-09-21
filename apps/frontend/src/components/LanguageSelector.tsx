"use client";

// TODO: Language selector feature temporarily commented out
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

/*
const languages = [
  { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
  { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
  { code: 'es-ES', name: 'Español', flag: '🇪🇸' },
  { code: 'fr-FR', name: 'Français', flag: '🇫🇷' },
  { code: 'de-DE', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it-IT', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt-BR', name: 'Português (BR)', flag: '🇧🇷' },
  { code: 'ja-JP', name: '日本語', flag: '🇯🇵' },
  { code: 'ko-KR', name: '한국어', flag: '🇰🇷' },
  { code: 'zh-CN', name: '中文 (简体)', flag: '🇨🇳' },
  { code: 'zh-TW', name: '中文 (繁體)', flag: '🇹🇼' },
  { code: 'ar-SA', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi-IN', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ru-RU', name: 'Русский', flag: '🇷🇺' },
];
*/

interface LanguageSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

// Temporary simple implementation without Select component
export const LanguageSelector = ({ value, onValueChange }: LanguageSelectorProps) => {
  return (
    <div className="flex items-center space-x-2">
      <span>🌐</span>
      <span className="text-sm text-muted-foreground">Language: {value}</span>
    </div>
  );
};

/*
// Original implementation - to be restored later
export const LanguageSelector = ({ value, onValueChange }: LanguageSelectorProps) => {
  const currentLanguage = languages.find(lang => lang.code === value) || languages[0];

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue>
          <div className="flex items-center space-x-2">
            <span>{currentLanguage.flag}</span>
            <span>{currentLanguage.name}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <div className="flex items-center space-x-2">
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
*/