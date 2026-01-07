export function validateMemeName(name: string): { valid: boolean; error?: string } {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Name is required' };
  }

  const trimmedName = name.trim();

  if (trimmedName.length === 0) {
    return { valid: false, error: 'Name cannot be empty' };
  }

  if (trimmedName.length > 200) {
    return { valid: false, error: 'Name must be less than 200 characters' };
  }

  // Check for suspicious patterns
  if (/<script|javascript:|onerror|>|<|onload|onclick/i.test(trimmedName)) {
    return { valid: false, error: 'Name contains invalid characters or patterns' };
  }

  return { valid: true };
}
