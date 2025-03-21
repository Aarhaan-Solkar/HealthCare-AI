import { User } from '../types';

export function login(email: string, password: string): Promise<User> {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        const user: User = {
          id: crypto.randomUUID(),
          email,
          name: email.split('@')[0],
          preferences: {
            darkMode: false,
            notifications: true,
            language: 'en'
          }
        };
        localStorage.setItem('user', JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 500);
  });
}

export function logout(): void {
  localStorage.removeItem('user');
}

export function getCurrentUser(): User | null {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

export function updateUserPreferences(preferences: User['preferences']): void {
  const user = getCurrentUser();
  if (user) {
    const updatedUser = { ...user, preferences };
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }
}