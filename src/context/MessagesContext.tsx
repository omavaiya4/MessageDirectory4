import React, { createContext, useContext, useState, ReactNode } from 'react';
import { categories as initialCategories, Category, Message } from '../data/messages';

interface MessagesContextType {
  categories: Category[];
  addMessage: (categoryId: string, message: Omit<Message, 'id'>) => void;
  markAsRead: (categoryId: string, messageId: string) => void;
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const addMessage = (categoryId: string, newMessage: Omit<Message, 'id'>) => {
    setCategories(prevCategories =>
      prevCategories.map(category => {
        if (category.id === categoryId) {
          const messageWithId: Message = {
            ...newMessage,
            id: Date.now().toString(),
          };
          return {
            ...category,
            messages: [...category.messages, messageWithId],
          };
        }
        return category;
      })
    );
  };

  const markAsRead = (categoryId: string, messageId: string) => {
    setCategories(prevCategories =>
      prevCategories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            messages: category.messages.map(msg =>
              msg.id === messageId ? { ...msg, unread: false } : msg
            ),
          };
        }
        return category;
      })
    );
  };

  return (
    <MessagesContext.Provider value={{ categories, addMessage, markAsRead }}>
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessagesContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
}
