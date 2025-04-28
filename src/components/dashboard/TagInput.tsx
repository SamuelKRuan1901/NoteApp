'use client';
import { useState, useRef, type KeyboardEvent, type ChangeEvent } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
  placeholder?: string;
  onChange?: (tags: string[]) => void;
  className?: string;
  tagValue?: string[];
}

export default function TagInput({
  placeholder = 'Add tags...',
  onChange,
  className = '',
  tagValue = []
}: TagInputProps) {
  const [tags, setTags] = useState<string[]>(tagValue);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      // Remove the last tag when backspace is pressed and input is empty
      const newTags = [...tags.slice(0, -1)];
      setTags(newTags);
      if (onChange) onChange(newTags);
      return;
    }

    if (
      (e.key === 'Enter' ||
        e.key === 'Tab' ||
        e.key === ' ' ||
        e.key === ',') &&
      inputValue.trim()
    ) {
      e.preventDefault();
      addTag(inputValue.trim());
    }
  };

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      const newTags = [...tags, tag];
      setTags(newTags);
      setInputValue('');
      if (onChange) onChange(newTags);
    }
  };

  const removeTag = (indexToRemove: number) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(newTags);
    if (onChange) onChange(newTags);
  };

  const clearAll = () => {
    setTags([]);
    setInputValue('');
    if (onChange) onChange([]);
    inputRef.current?.focus();
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      ref={containerRef}
      className={`flex items-center flex-wrap border border-gray-300 rounded-md px-3 py-1.5 gap-2 ${className}`}
      onClick={focusInput}
    >
      {tags.map((tag, index) => (
        <div
          key={index}
          className='flex items-center bg-gray-100 dark:bg-gray-800 rounded-sm px-2 py-0.5 text-sm'
        >
          <span>{tag}</span>
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              removeTag(index);
            }}
            className='ml-1 text-gray-500 hover:text-gray-700'
            aria-label={`Remove ${tag}`}
          >
            <X className='h-3 w-3 cursor-pointer' />
          </button>
        </div>
      ))}
      <div className='flex-1 flex items-center'>
        <input
          ref={inputRef}
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ''}
          className='flex-1 outline-none bg-transparent text-sm min-w-[50px]'
          aria-label='Add tags'
        />
        {(tags.length > 0 || inputValue) && (
          <button
            type='button'
            onClick={clearAll}
            className='ml-auto text-gray-400 hover:text-gray-600'
            aria-label='Clear all tags'
          >
            <X className='h-5 w-5' />
          </button>
        )}
      </div>
    </div>
  );
}
