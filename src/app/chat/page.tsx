'use client';

import { useState, FormEvent } from 'react';
import styles from "./chat.module.css";
import Link from "next/link";
import type { Message } from '@/types/chat';

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage]
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await response.json();
      const assistantMessage: Message = data.message;

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.backButton}>
          ← Back
        </Link>
        <h1 className={styles.title}>Get a 12-Week Plan Here</h1>
      </header>
      
      <main className={styles.main}>
        <div className={styles.messageContainer}>
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`${styles.message} ${message.role === 'assistant' ? styles.assistant : styles.user}`}
            >
              <div className={styles.messageContent}>
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className={`${styles.message} ${styles.assistant}`}>
              <div className={styles.messageContent}>
                <div className={styles.loadingDots}>...</div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <form className={styles.inputForm} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder=""
            className={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className={styles.sendButton}
            disabled={isLoading || !input.trim()}
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}
